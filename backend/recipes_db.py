import sqlite3
import pandas as pd
import json
import os

def create_and_load_db(filename: str, db_name: str="recipes.db"):
    """
    Create a SQL DB from the cleaned csv file
    """

    print(f"Starting to create and load database from '{filename}'...")

    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    try:
        df = pd.read_csv(filename) # Read recipes_cleaned.csv to create a DB

        # Drop the table if exists before creating a DB 
        cursor.execute("DROP TABLE IF EXISTS recipes")

        # Create recipes db. List items will be stored as TEXT in json format
        cursor.execute("""
            CREATE TABLE recipes (
                id INTEGER PRIMARY KEY,
                name TEXT,
                minutes INTEGER,
                tags TEXT,
                nutrition TEXT,
                n_steps INTEGER,
                steps TEXT,
                description TEXT,
                ingredients TEXT,
                n_ingredients INTEGER,
                meal_type TEXT,
                food_type TEXT
            )  
        """)

        # Perform data insertion by looping through the df (dataframe)
        for _, row in df.iterrows():
            
            # Serialize the list containing columns into JSON string
            tags_json = json.dumps(row['tags'])
            nutrition_json = json.dumps(row['nutrition'])
            steps_json = json.dumps(row['steps'])
            description_json = json.dumps(row['description'])
            ingredients_json = json.dumps(row['ingredients'])

            # Insert data into the DB using a parameterized query
            cursor.execute("""
                INSERT INTO recipes (
                    id, name, minutes, tags, nutrition, n_steps, steps, description, 
                    ingredients, n_ingredients, meal_type, food_type
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                row['id'], row['name'], row['minutes'], tags_json, nutrition_json,
                row['n_steps'], steps_json, description_json, ingredients_json,
                row['n_ingredients'], row['meal_type'], row['food_type']
            ))

        conn.commit()
        print(f"Database is created")
    except FileNotFoundError:
        print(f"Error: The file {filename} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
        conn.rollback() # Hopefully, it doesn't reach here...
    finally:
        conn.close() # To make sure connection is closed
        
if __name__ == "__main__":
    create_and_load_db("recipes_cleaned.csv")