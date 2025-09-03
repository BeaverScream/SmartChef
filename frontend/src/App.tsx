import { useState } from 'react';

// Define the type for a recipe object to ensure data consistency
interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
}

// React component for the SmartChef application
function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleDietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedDiets(prev =>
      checked ? [...prev, value] : prev.filter(diet => diet !== value)
    );
  };

  const dietOptions = [
    { id: 'meatBased', value: 'meat-based', icon: 'fa-drumstick-bite', color: 'blue', label: 'Meat-Based' },
    { id: 'vegetarian', value: 'vegetarian', icon: 'fa-leaf', color: 'green', label: 'Vegetarian' },
    { id: 'vegan', value: 'vegan', icon: 'fa-seedling', color: 'purple', label: 'Vegan' },
    { id: 'pescetarian', value: 'pescetarian', icon: 'fa-fish-fins', color: 'pink', label: 'Pescetarian' },
  ];

  const handleSelectAll = () => {
    const allDiets = dietOptions.map(option => option.value);
    const allSelected = allDiets.every(diet => selectedDiets.includes(diet));
    if (allSelected) {
      setSelectedDiets([]);
    } else {
      setSelectedDiets(allDiets);
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

    // This is where you would typically send the data to your server.
    // For now, we'll just log it to the console.
    console.log('User Input:', userInput);
    console.log('Selected Diets:', selectedDiets);

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

    setRecipes(simulatedRecipes);
    setLoading(false);
    setUserInput('');
  };

  return (
    <div className="bg-gray-100 font-inter min-h-screen p-4 flex items-center justify-center">
      {/* Main Content Container with Glassmorphism Effect */}
      <div className="bg-white/80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl p-8 space-y-8 border border-gray-200">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">SmartChef</h1>
          <p className="mt-2 text-gray-600 text-sm md:text-base">Ask me anything about food and I'll give you a recommendation!</p>
        </header>

        {/* Dietary Preference Checkboxes and Select All Button */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
          {dietOptions.map(option => (
            <label key={option.id} className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105">
              <input
                type="checkbox"
                id={option.id}
                name="diet"
                value={option.value}
                className="hidden peer"
                checked={selectedDiets.includes(option.value)}
                onChange={handleDietChange}
              />
              <i className={`fa-solid ${option.icon} text-2xl mb-2 text-gray-500 peer-checked:text-${option.color}-600 transition-colors`}></i>
              <span className="text-sm font-semibold text-gray-700 select-none">{option.label}</span>
            </label>
          ))}
          <button
            onClick={handleSelectAll}
            className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Select All
          </button>
        </div>

        {/* User Input Section */}
        <div className="space-y-4">
          {feedback && (
            <div className="text-red-500 text-sm font-semibold text-center animate-bounce">
              {feedback}
            </div>
          )}
          <textarea
            id="userInput"
            rows={4}
            placeholder="e.g., A quick weeknight dinner recipe or a list of ingredients for a hearty stew."
            className="w-full p-4 text-white placeholder-gray-300 bg-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button
            id="submitBtn"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-3">Cooking...</span>
              </div>
            ) : 'Get Recommendation'}
          </button>
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
    </div>
  );
}

export default App;
