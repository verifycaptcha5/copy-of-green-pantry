import React, { useState } from 'react';
import { Clock, Users, Flame, ChefHat, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md border border-brand-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide
                ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'}`}>
                {recipe.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{recipe.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-y border-gray-100 py-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime} prep</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} serv</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>{recipe.calories} kcal</span>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-brand-600 font-medium hover:text-brand-700 transition-colors"
        >
          {isExpanded ? (
            <>Hide Recipe <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>View Recipe <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-brand-50/30 px-6 pb-6 pt-2 border-t border-brand-100">
          <div className="grid md:grid-cols-2 gap-8 mt-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">1</span>
                Ingredients
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">2</span>
                Instructions
              </h4>
              <ol className="space-y-4 text-sm text-gray-700">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-brand-400 select-none">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
