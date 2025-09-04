import { useState } from 'react';
import Header from './components/Header';
import DietaryPreferenceCheckBox from './components/DietaryPreferencesCheckBoxes';
import UserInputTextBox from './components/UserInputTextBox';
import SubmitButton from './components/SubmitButton';
import ReturnedRecipeList from './components/ReturnedRecipeList';

export interface Recipe {
  name: string;
  ingredients: string[];
  nutrition: number[];
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
  
    const hasUserInput = userInput.trim().length > 3;
    const hasPreferences = dietaryPreferences.length > 0

    // Handle feedback for the three cases
    if (!hasUserInput && !hasPreferences) {
        setFeedback('Please provide a food query and select at least one dietary preference.');
        setTimeout(() => setFeedback(''), 3000);
        return;
    }

    if (!hasUserInput) {
        setFeedback('Please enter a text input before getting recommendations.');
        setTimeout(() => setFeedback(''), 3000);
        return;
    }

    if (!hasPreferences) {
        setFeedback('Please select at least one dietary preference.');
        setTimeout(() => setFeedback(''), 3000);
        return;
    }

    setLoading(true);
    setRecipes(null); // Clear previous recipes
    setFeedback(''); // Clear any previous feedback

    ///////////// TODO //////////////
    // This is where you would typically send the data to your server.
    // For now, it will stay like this.
    const requestData = {
      query: userInput,
      dietary_preference: dietaryPreferences
    }

    console.log('User request:', requestData);

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
        nutrition: [400.5, 12.0, 5.0, 50.0, 15.0, 3.0, 8.0],
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
        nutrition: [250.0, 2.0, 0.0, 40.0, 10.0, 15.0, 6.0],
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
        nutrition: [350.5, 25.0, 18.0, 10.0, 1.0, 2.0, 10.0],
        instructions: 'Preheat oven to 400°F (200°C). Place salmon and asparagus on a baking sheet. Drizzle with olive oil, season with salt and pepper, and top with lemon slices. Roast for 12-15 minutes, or until salmon is cooked through.'
      }
    ];

    //////////////////////////////////////////////

    //////// TODO /////////
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
        
        {/* Recipes display area */}
        <ReturnedRecipeList
          recipes = {recipes} // Placeholder for visual testing
        />
        
      </div>
    </div>
  );
}

export default App;