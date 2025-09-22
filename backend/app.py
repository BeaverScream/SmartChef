from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app) # TODO: will update this later

@app.rout('/api/get-recipes', method=['POST'])
def get_recipes():
    """
    Recevies user input and dietary preferences. and returns a list of recipes.
    """
    
    if not request.is_json:
        return jsonify({"error:" : "Request must be JSON"}), 400

    data = request.get_json()
    user_input = data.get('userInput')
    dietary_pref = data.get('dietaryPreferences')
    
    print('From frontend:')
    print(f'User Input: {user_input}')
    print(f'Dietary preferences:, {dietary_pref}')
    
    # TODO: send user input and diet preference to LLM to retrieve the response
    
if __name__ == '__main__':
    app.run(debug=True, port=3000)