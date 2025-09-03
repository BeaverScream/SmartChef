# Project Overview

SmartChef is a full-stack demo project designed to find recipes based on a user's natural language request. My goal is to build a backend that uses a large language model (LLM) to intelligently understand a user's query and retrieve the most relevant recipes from a large dataset. The program goes beyond simple keyword matching to grasp the context of the request.

For example, if a user asks for ingredients like "chicken, broccoli, onion, carrot, and rice," the program will interpret this to suggest recipes like "Chicken Fried Rice" or "Chicken and Vegetable Soup" rather than just a list of dishes containing those items.

# Data Source and Data Cleaning

The raw data for this project comes from the **Food.com Recipes and Interactions** dataset, which is publicly available on [Kaggle](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv).

The `recipes_cleaned.csv` file used in this project is a pre-processed version of the raw dataset, which will be cleaned and prepared for use in the LLM-powered backend.

---
# Work Flow

The system has three main phases: a one-time data processing stage, core query-handling function, and frontend UI work.

## Phase 1: Source Data Cleaning
The source data is well structured but some of the contents were not useful to be used. This requires some cleaning. 
The cleaning logic is inside `data_cleaning.ipynb`. I used Jupyter notebook for this process because I want to check the interim steps of data processing. Since this is a one time operation and the data base will not regularly updated, I did not create a separate python script for this step. The data cleaning has two main phase as described below:

1. **Manual filtering**: I reviewed the data and cleaned up recipes that don't meet requirements. For example, the recipes take too long/short time to make, too many ingredients required, too many steps involved and do not have enough description were filtered out. This step removed about 50% of the recipes in the source file. I also added two columns `meal_type` and `food_type` so I can use both LLM and SQL query to improve the program performance.

    * **meal_type**: has 3 categories, meal, side-dish, dessert
    * **food_type**: has 5 categories, vegetarian, vegan, meat-base, pescetarian, uncategorized

2. **Categorizing using LLM**: Some people have strict dietary restrictions and this can be frustrating if recommended recipes do not suit their needs. The manual filtering couldn't categorize all the remaining recipes so I decided to use LLM to categorize `uncategorized` recipes for me. This requires to get an API key of LLM and preparing prompt to feed to the LLM. ...UPDATE REQUIRED LATER...

## Phase 2: Building Database and Connecting to Backend Logic

...UPDATE REQUIRED LATER...

## Phase 3: Frontend and UI Design

...UPDATE REQUIRED LATER...

Now, React is implemented with the simple function. It's not communicating with the backend yet but when a user enters a text in the text box and then press the get recommendation button, it returns the simulated recipes in a list format. 
Next step is to work on the backend side so it processes user's request and get the response back.


## Phase 4: Testing

...UPDATE REQUIRED LATER...

General work flow will be:

1. **LLM Query Analysis:** The user's text input is sent to an LLM. The model analyzes the request to identify key ingredients, dietary needs, and cooking style.

2. **Database Search:** The program uses the information from the LLM's analysis to search the categorized recipe database.

3. **Recipe Presentation:** The best-matching recipes are then fetched and returned to the frontend.

# Technology Stack & Requirements - TO BE UPDATED

## Backend

* **Language:** Python

* **Core Libraries:** `pandas` for data manipulation, `aiohttp` for asynchronous API calls, and `python-dotenv` for managing environment variables.

* **LLM Integration:** The **Gemini API** is used for both the initial recipe categorization and the natural language understanding of user queries.

* **Vectorization:** To enable efficient recipe search, I use text embeddings, which are generated from the LLM's output and stored for similarity searches.

## Frontend

* **Framework:** The frontend will be built with **React**.

* **Styling:** **Tailwind CSS** will be used for a responsive design.

---

# Getting Started

## Prerequisites - TO BE UPDATED

* Python 3.x

* A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

* The `recipes_cleaned.csv` dataset

## Project Status

This is currently in the **Phase 1: Source Data Cleaning**. I'm validating the LLM's ability to categorize the data, which is a critical step for building a clean database. 