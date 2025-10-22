from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import sqlite3
import os
import logging
import numpy as np
from typing import Optional, Dict, Any
import ast
import faiss

# -------Setting up logging-----------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------Initialization-----------------
DB_PATH = 'data/recipes.db'
BASE_FAISS_DIR = 'data'
TOP_K_RESULT = 10 # number of recipes to retrieve

try:
    logger.info("Loading sentence transformer model...") 
    EMBEDDING_MODEL = SentenceTransformer('all-MiniLM-L6-v2')
    D_VECTOR = EMBEDDING_MODEL.get_sentence_embedding_dimension()
    logger.info(f"Model loaded. Vector dimension: {D_VECTOR}")
except Exception as e:
    logger.error(f"Error loading sentence transformer: {e}")
    EMBEDDING_MODEL = None
    D_VECTOR = 384

# --------Helper functions-----------------
def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH) # to set dictionary like format
    conn.row_factory = sqlite3.Row
    return conn

def decode_vector_from_db(vector_data) -> np.ndarray:
    if isinstance(vector_data, str):
        try:
            return np.array([float(x) for x in vector_data.split(',')], dtype='float32')
        except ValueError as e:
            logger.error(f"Failed to parse vector string: {e}")
            return np.zeros(D_VECTOR, dtype='float32')
    return np.zeros(D_VECTOR, dtype='float32')

def parse_recipe_data(recipe_row: sqlite3.Row) -> Optional[Dict[str, Any]]:
    try:
        ingredient_list = []
        nutrition_list = []
        if recipe_row['ingredients']:
            ingredient_list = ast.literal_eval(recipe_row['ingredients'])
        if recipe_row['nutrition']:
            nutrition_list = ast.literal_eval(recipe_row['nutrition'])
        
        return {
            'id': recipe_row['id'],
            'name': recipe_row['name'],
            'ingredients': ingredient_list,
            'nutrition': nutrition_list,
            'instructions': recipe_row['instructions']
        }
    except Exception as e:
        logger.error(f"Error parsing recipe data for recipe: {recipe_row['id'] if 'id' in recipe_row else 'unknown'}: {e}")
        return None
        
# --------Flask app set up-----------------
app = Flask(__name__)
CORS(app) # TODO: will update this later

# --------API end point--------------------
@app.route('/api/get-recipes', methods=['POST'])
def get_recipes():
    
    if not request.is_json:
        return jsonify({"error" : "Request must be JSON"}), 400

    data = request.get_json() # data received has two keys
    user_input = data.get('query')
    dietary_pref = data.get('dietary_preference')
    
    if not user_input or not dietary_pref:
        return jsonify({"error": "Missing user input or dietary preference"}), 400
    
    if EMBEDDING_MODEL is None:
        return jsonify({"error": "Server is initializing or missing model/index files."}), 503

    conn = None
    try:
        query_vector = EMBEDDING_MODEL.encode(user_input, convert_to_tensor=False)
        query_vector = np.expand_dims(query_vector, axis=0).astype('float32')
    
        logger.info(f"Performing SQL filter for preference: {dietary_pref}")
        
        dietary_pref.sort()
        file_key = "_".join(dietary_pref)
        faiss_file_path = os.path.join(BASE_FAISS_DIR, f'faiss_{file_key}.bin')
        
        current_faiss_index = None
        
        try:
            if os.path.exists(faiss_file_path):
                current_faiss_index = faiss.read_index(faiss_file_path)
                logger.info(f"Loaded specific Faiss index: {faiss_file_path} ({current_faiss_index.ntotal} vectors)")
            else:
                logger.error(f"Faiss index file not found: {faiss_file_path}")
                return jsonify({"recipes": [], "message": "Index file not found for the selected preferences."}), 500
        except Exception as e:
            logger.error(f"Error loading Faiss index {faiss_file_path}: {e}")
            return jsonify({"error": "Failed to load vector index for search."}), 500
        
        # Vector similarity search
        distance, faiss_indices = current_faiss_index.search(query_vector, TOP_K_RESULT)
        db_recipe_ids = [int(i) for i in faiss_indices[0] if i != -1]
        
        if not db_recipe_ids:
            return jsonify({"recipes": [], "message": "No relevant recipes found for your query within the selected preferences."})
        
        # Connect to the DB
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Query set up/execution
        placeholder = ','.join('?' * len(db_recipe_ids))
        sql_retrieve_result_query = f"""
            SELECT id, name, ingredients, nutrition, instructions
            FROM recipes
            WHERE id IN ({placeholder})
        """
        
        cursor.execute(sql_retrieve_result_query, db_recipe_ids)
        result_recipes = cursor.fetchall()
        
        recipe_dict = {row['id']: row for row in result_recipes}
        formatted_recipes = []
        
        for recipe_id in db_recipe_ids:
            row = recipe_dict.get(recipe_id)
            if row:
                formatted_recipe = parse_recipe_data(row)
                if formatted_recipe:
                    formatted_recipes.append(formatted_recipe)
        
        logger.info(f"Successfully retrieved and formatted {len(formatted_recipes)} recipes.")
        return jsonify({"recipes": formatted_recipes}), 200
        
    except sqlite3.Error as sqle:
        logger.error(f"SQLite Database Error: {sqle}")
        return jsonify({"error": "A database access error occurred."}), 500
    except Exception as e:
        logger.error(f"An unexpected server error occurred: {e}") 
        return jsonify({"error": "An internal server error occurred."}), 500
    
    finally:
        if conn:
            conn.close()
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)