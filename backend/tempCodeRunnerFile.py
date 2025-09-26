
        # # For Robust csv importing
        # columns_to_convert = ['tags', 'nutrition', 'steps', 'ingredients', 'embedding']
        # for col in columns_to_convert:
        #     if col in df.columns:
        #         print(f"Converting string representations in column '{col}' to Python objects...")
        #         # Use ast.literal_eval for safe string-to-list/dict conversion
        #         df[col] = df[col].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)