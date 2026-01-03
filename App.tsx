import React, { useState } from 'react';
import { ChefHat, Leaf } from 'lucide-react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { generateRecipesFromIngredients } from './services/geminiService';
import { Recipe } from './types';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (name: string) => {
    if (!ingredients.includes(name)) {
      setIngredients([...ingredients, name]);
    }
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter(i => i !== name));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    
    try {
      const generatedRecipes = await generateRecipesFromIngredients(ingredients);
      setRecipes(generatedRecipes);
    } catch (err) {
      setError("Failed to generate recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-brand-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
              <ChefHat size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Green<span className="text-brand-600">Pantry</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-sm text-brand-700 font-medium bg-brand-50 px-3 py-1 rounded-full">
            <Leaf size={16} />
            <span>Sustainable Cooking</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col gap-12">
          
          {/* Input Section */}
          <section className="w-full flex flex-col items-center">
             <div className="text-center mb-8 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Turn your leftovers into <span className="text-brand-600">masterpieces</span>.
              </h2>
              <p className="text-lg text-gray-600">
                Don't let food go to waste. Tell us what you have, and our AI chef will curate the perfect recipes for you.
              </p>
            </div>
            <IngredientInput 
              ingredients={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
              onGenerate={handleGenerate}
              isGenerating={loading}
            />
          </section>

          {/* Results Section */}
          {error && (
            <div className="max-w-2xl mx-auto w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {recipes.length > 0 && (
            <section className="animate-fadeIn">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Suggested Recipes</h3>
                <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-medium">
                  {recipes.length} Found
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            </section>
          )}
          
          {/* Empty State / Prompt (if no recipes and not loading) */}
          {!loading && recipes.length === 0 && ingredients.length > 0 && !error && (
            <div className="text-center mt-12 opacity-0 animate-[fadeIn_1s_ease-in_forwards] animation-delay-500">
              <p className="text-brand-800/60 font-medium">Ready to cook? Hit "Find Recipes" above.</p>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GreenPantry. Powered by Google Gemini.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="hover:text-brand-600 cursor-pointer">Privacy</span>
            <span className="hover:text-brand-600 cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
