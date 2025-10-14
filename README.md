# Project Overview

SmartChef is a full-stack demo project designed to find recipes based on a user's natural language request. My goal is to build an application that uses a large language model (LLM) to intelligently understand a user's query and retrieve the most relevant recipes from a large dataset. The program goes beyond simple keyword matching to grasp the context of the request.

For example, if a user asks for ingredients like "chicken, broccoli, onion, carrot, and rice," the program will interpret this to suggest recipes like "Chicken Fried Rice" or "Chicken and Vegetable Soup" rather than just a list of dishes containing those items.

# Data Source and Data Cleaning

The raw data for this project comes from the **Food.com Recipes and Interactions** dataset, which is publicly available on [Kaggle](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv).

The `df_sampled_6000_MiniLM.csv` file used in this project is a pre-processed version of the raw dataset, which will be cleaned and prepared for use in the LLM-powered backend. The `recipes.db` is built using the this dataset.

---
# Work Flow

The system has three main phases: a one-time data processing stage (preparing database), core query-handling function (backend), and frontend UI work (frontend).

## Phase 1: Source Data Cleaning and Pre-Processing

The source data is well structured but some of the contents were not useful to be used. This requires some cleaning. 
The cleaning and pre-processing logic is inside `data_cleaning.ipynb`. I used Jupyter notebook for this process because I want to check the interim steps of data processing. Since this is a one time operation and the data base will not regularly updated, I did not create a separate python script for this step. This phase has two main parts as described below:

1. **Manual Data Cleaning**: I reviewed the data and cleaned up recipes that don't meet requirements. For example, the recipes take too long/short time to make, too many ingredients required, too many steps involved and do not have enough description were filtered out. This step removed about 50% of the recipes in the source file. Since I still have too many recipes, I decided to randomly chose 6000 recipes while maintaining the proportion of `food_type` which I added based on diet cateogories. This is useful as I'm planning to apply both LLM and SQL query to improve the program performance.

    * **food_type**: has 4 categories, vegetarian, vegan, meat-base, pescetarian

2. **Create embedding and the vector index for the sampled food recipes**: Using the sampled 6000 food recipes, I used all-MiniLM-L6-v2 to generate embeddings of the sampled recipe for similarity search. The embedding vectors are added as additional column. I originally tried to use gemini but it has tight api call limit so decided to use open source LLM. After generating the embedding, I decided to use Faiss to create the vector index using the embedding of the food recipes. As the database will not be updated frequently, one time vector index generation using faiss seemed reasonable to me.

...UPDATE REQUIRED LATER...

## Phase 2: Frontend and UI Design

React is implemented with the simple function. It's not communicating with the backend yet but when a user enters a text in the text box and then press the get recommendation button, it returns the simulated recipes in a list format. 
Next step is to work on the backend side so it processes user's request and get the response back.

...UPDATE REQUIRED LATER...

## Phase 3: Building Database and Connecting to Backend Logic

The database is generated using recipes_db.py. The main server file is app.py and still work in progress.

...UPDATE REQUIRED LATER...

## Phase 4: Testing

...UPDATE REQUIRED LATER...
---

# Getting Started

## Prerequisites - TO BE UPDATED

* Python 3.x

## Project Status

This is currently in the **Phase 3: Building Database and Connecting to Backend Logic**.