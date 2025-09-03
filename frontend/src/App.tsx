import { useState } from 'react';
import Header from './components/Header';
import DietaryPreferenceCheckBox from './components/DietaryPreferencesCheckBoxes';
import UserInputTextBox from './components/UserInputTextBox';
import SubmitButton from './components/SubmitButton';

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
}

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  // Current dietOptions. 
  const dietOptions = [
        { id: 'meatBased', value: 'meat-based', icon: 'fa-drumstick-bite', color: 'blue', label: 'Meat-Based' },
        { id: 'vegetarian', value: 'vegetarian', icon: 'fa-leaf', color: 'green', label: 'Vegetarian' },
        { id: 'vegan', value: 'vegan', icon: 'fa-seedling', color: 'purple', label: 'Vegan' },
        { id: 'pescetarian', value: 'pescetarian', icon: 'fa-fish-fins', color: 'pink', label: 'Pescetarian' },
  ];

  const handleSelectAllClick = () => {
    const allOptionsValues = dietOptions.map(option => option.value);
    const allChecked = dietaryPreferences.length === allOptionsValues.length;

    setDietaryPreferences(allChecked ? [] : allOptionsValues);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setDietaryPreferences(prev => [...prev, value]);
    }  else {
      setDietaryPreferences(prev => prev.filter(pref => pref !== value));
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setFeedback('Please enter a food query before getting a recommendation.');
      setTimeout(() => setFeedback(''), 3000);
      return;
    }

    setLoading(true);
    setRecipes(null); // Clear previous recipes
    setFeedback(''); // Clear any previous feedback

    /////////////TODO//////////////
    // This is where you would typically send the data to your server.
    // For now, it will stay like this. TODO
    console.log('User Input:', userInput);
    console.log('Dietary Preferences:', dietaryPreferences);

    // Simulate a network request with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate a structured JSON response from the server
    const simulatedRecipes: Recipe[] = [
      {
        name: 'Quick Pasta Primavera',
        ingredients: [
          '200g pasta',
          '1 cup mixed vegetables (broccoli, bell peppers, carrots)',
          '2 cloves garlic, minced',
          '1/4 cup olive oil',
          'Salt and pepper to taste'
        ],
        instructions: 'Cook pasta according to package directions. In a large skillet, sauté vegetables and garlic in olive oil. Drain pasta, add to skillet, and toss to combine. Season with salt and pepper. Serve immediately.'
      },
      {
        name: 'Easy Vegan Lentil Soup',
        ingredients: [
          '1 tbsp olive oil',
          '1 onion, chopped',
          '2 carrots, chopped',
          '2 celery stalks, chopped',
          '1 cup brown or green lentils',
          '4 cups vegetable broth',
          '1 tsp cumin',
          'Salt and pepper to taste'
        ],
        instructions: 'Heat olive oil in a pot over medium heat. Add onion, carrots, and celery and cook until soft. Stir in lentils, vegetable broth, and cumin. Bring to a boil, then reduce heat and simmer for 30 minutes, or until lentils are tender. Season with salt and pepper before serving.'
      },
      {
        name: 'Simple Salmon with Asparagus',
        ingredients: [
          '2 salmon fillets',
          '1 bunch asparagus, trimmed',
          '1 tbsp olive oil',
          '1 lemon, sliced',
          'Salt and black pepper'
        ],
        instructions: 'Preheat oven to 400°F (200°C). Place salmon and asparagus on a baking sheet. Drizzle with olive oil, season with salt and pepper, and top with lemon slices. Roast for 12-15 minutes, or until salmon is cooked through.'
      }
    ];

    //////////////////////////////////////////////

    ////////TODO/////////
    setRecipes(simulatedRecipes);
    setLoading(false);
    setUserInput('');
  };

  //////////////////////////////////////

  return (
    <div className="bg-gray-100 font-inter min-h-screen p-4 flex items-center justify-center">
      {/* Main Content Container with Glassmorphism Effect */}
      <div className="bg-white/80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl p-8 space-y-8 border border-gray-200">
        <Header />

        {/* Dietary Preference Checkboxes and Select All Button */}
        <DietaryPreferenceCheckBox 
          dietaryPreferences = {dietaryPreferences}
          handleCheckboxChange = {handleCheckBoxChange}
          handleSelectAllClick = {handleSelectAllClick}  
          dietOptions = {dietOptions}
        />

        {/* User Input Section */}
        <UserInputTextBox
          userInput = {userInput}
          setUserInput = {setUserInput}
          feedback = {feedback}
        />
        {/* Submit button */}
        <SubmitButton 
          loading = {loading}
          handleSubmit = {handleSubmit}
        />
      </div>
        
        {/* Recipes display area */}
        {recipes && (
          <div id="responseContainer">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Recommendations</h2>
            <div id="responseOutput" className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 leading-relaxed scroll-container max-h-96 overflow-y-auto shadow-inner space-y-8">
              {recipes.map((recipe, index) => (
                <div key={index} className="p-4 rounded-xl bg-white shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
                  <div className="mt-2">
                    <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800">Instructions:</h4>
                    <p className="mt-1">{recipe.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default App;