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

  const dietOptions = [
        { id: 'meatBased', value: 'meat-base', icon: 'fa-drumstick-bite', color: 'blue', label: 'Meat-Base' },
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

    const requestData = {
      query: userInput,
      dietary_preference: dietaryPreferences
    }

    console.log('User request:', requestData);

    try {
      console.info('Sending request to backend...', { userInput, dietaryPreferences });

      const response = await fetch('http://127.0.0.1:5000/api/get-recipes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          query: userInput,
          dietary_preference: dietaryPreferences,
        }),
      });

      if (!response.ok) {
        const errorData =await response.json().catch(() => ({}));
        console.error('Backend returned error:', errorData);
        setFeedback(errorData || 'Server error occured');
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.info('Response from backend:', data)

      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
      } else {
        setFeedback('No recipes found for your query');
        setRecipes([])
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      setFeedback('Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
      // setUserInput('');
    }

  };

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
          recipes = {recipes} 
        />

      </div>
    </div>
  );
}

export default App;