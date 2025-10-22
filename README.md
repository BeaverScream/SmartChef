# SmartChef  

**SmartChef** is a full-stack demo application that recommends recipes based on a user’s natural language query. It combines **frontend UI**, **backend logic**, and **machine learning embeddings** to provide intelligent recipe suggestions tailored to user input and dietary preferences.  

This project demonstrates **full-stack development**, **LLM-powered search**, and **vector similarity retrieval** using FAISS.

---

## Features  

- Accepts free-form queries (e.g., “tofu recipes high in protein and easy to cook”).  
- Filters recipes based on dietary preferences (vegan, vegetarian, meat-based, pescetarian).  
- Retrieves relevant recipes using **sentence embeddings** and **vector similarity search**.  
- Displays ingredients, nutrition information, and step-by-step instructions.  

---

## Data Source  

The raw data comes from the **[Food.com Recipes and Interactions](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv)** dataset.  

- Preprocessed dataset: `df_sampled_6000_MiniLM.csv`  
- Database: `recipes.db`  
- FAISS vector indexes generated for efficient similarity search.  

Data cleaning included:  
- Removing recipes with too many/few ingredients or steps.  
- Randomly sampling 6000 recipes while maintaining dietary proportions.  
- Generating embeddings using `all-MiniLM-L6-v2` and building FAISS indexes.

---

## How to Use  

### Windows Users
You can start both frontend and backend at once using the included batch file:

1. Double-click `start_smartchef.bat` in the project root.  
2. This will open two separate terminal windows:
   - **Backend:** runs Flask and loads the model/index.  
   - **Frontend:** runs the React app.  

> Note: The backend may take a few seconds to start while the model and FAISS index load.

### Manual Start (All Users)
1. **Start the backend** (This can take some time)

    From the project folder:
   ```bash
   cd backend
   python app.py
   ```
2. **Start the frontend**

    From the project folder:
    ```bash
    cd frontend
    npm install      # if not already installed
    npm run dev
    ```

3. **Enter your query and select dietary preferences**

    In the web browser, move to http://localhost:5173/.

    Select dietary preferences and description of recipes that you want to retrieve. 

4. **Get Recommendations**

    Click “Get Recommendation” to fetch recipes from the backend.
    
    Recipes appear with ingredients, nutrition info, and instructions.
