from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import faiss
import sqlite3
import numpy as np
import os
import logging
import numpy as np

# -------Setting up logging-----------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------Initialization-----------------
DB_PATH = 'data/recipes.db'
FAISS_INDEX_PATH = 'data/faiss_index.bin'

try:
    logger.info("Loading sentence transformer model...") 
    EMBEDDING_MODEL = SentenceTransformer('all-MiniLM-L6-v2')
    D_VECTOR = EMBEDDING_MODEL.get_sentence_embedding_dimension()
    logger.info(f"Model loaded. Vector dimension: {D_VECTOR}")
except Exception as e:
    logger.error(f"Error loading sentence transformer: {e}")
    EMBEDDING_MODEL = None
    D_VECTOR = 384

try:
    if os.path.exists(FAISS_INDEX_PATH):
        logger.info(f"Loading Faiss index from {FAISS_INDEX_PATH}")
        FAISS_INDEX = faiss.read_index(FAISS_INDEX_PATH)
        logger.info(f"Faiss index loaded successfully. Total vectors: {FAISS_INDEX.ntotal}")
    else:
        logger.error(f"Faiss index file not found at {FAISS_INDEX_PATH}")
except Exception as e:
    print(f"Error occured while loading Faiss index: {e}")
    FAISS_INDEX = None

# --------Helper functions-----------------

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def decod_vector_from_db(vector_data):
    if isinstance(vector_data, str):
        try:
            return np.array([float(x) for x in vector_data.split(',')], dtype='float')
        except ValueError as e:
            logger.error(f"Failed to parse vector string: {e}")
            return np.zeros(D_VECTOR, dtype='float32')
    return np.zeroes(D_VECTOR, dtype='float32')

# --------Flask app set up-----------------
app = Flask(__name__)

CORS(app) # TODO: will update this later

# --------API end point--------------------
@app.route('/api/get-recipes', method=['POST'])
def get_recipes():
    """
    Receives user input and dietary preferences, performs hybrid SQL + Vector search, 
    and returns a list of recipes.
    """
    
    if not request.is_json:
        return jsonify({"error:" : "Request must be JSON"}), 400

    data = request.get_json()
    user_input = data.get('query')
    dietary_pref = data.get('dietary_preference')
    
    if not user_input or not dietary_pref:
        return jsonify({"error": "Missing user input or dietary preference"}), 400
    
    if EMBEDDING_MODEL is None or FAISS_INDEX is None:
        return jsonify({"error": "Server is initializing or missing model/index files."}), 503

    conn = None
    try:
        query_vector = EMBEDDING_MODEL.encode(user_input, convert_to_tensor=False)
        query_vector = np.expand_dims(query_vector, axis=0)
    
        conn = get_db_connection()
        cursor = conn.cursor()
        
        logger.info(f"Performing SQL filter for preference: {dietary_pref}")
        # Filtering logic
        placeholder = ','.join('?' * len(dietary_pref))
        sql_filter_query = f"""
            SELECT id, embedding
            FROM recipes
            WHERE food_type IN ({placeholder})
        """
        # Query execution
        cursor.execute(sql_filter_query, dietary_pref)
        filtered_recipes = cursor.fetchall()
        
        # The block below shouldn't be reached because there will be always more than one recipe per food_type
        if not filtered_recipes:
            return jsonify({
                "recipes": [],
                "message": "There's error retrieving recipes from the database"
            }), 500
            
        # TODO: need vector similarity search logic and return result
    
    except Exception as e:
        print(f"An error occured: {e}") # TODO: need to update
        return jsonify({"error": "A server error occured."}), 500
    
    finally:
        if conn:
            conn.close()
    
    # TODO: send user input and diet preference to LLM to retrieve the response
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)