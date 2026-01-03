import React, { useState, KeyboardEvent } from 'react';
import { Plus, X, Refrigerator } from 'lucide-react';
import { Button } from './Button';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onAdd,
  onRemove,
  onGenerate,
  isGenerating
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-brand-100">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-100 rounded-lg">
            <Refrigerator className="w-6 h-6 text-brand-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">What's in your fridge?</h2>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter an ingredient (e.g., chicken, spinach, eggs)"
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            disabled={isGenerating}
          />
          <Button onClick={handleAdd} disabled={!inputValue.trim() || isGenerating} variant="secondary">
            <Plus className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Add</span>
          </Button>
        </div>

        <div className="mb-8">
          {ingredients.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p>No ingredients added yet.</p>
              <p className="text-sm mt-1">Add items to start cooking!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, idx) => (
                <span 
                  key={`${ing}-${idx}`} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700 border border-brand-200 animate-fadeIn"
                >
                  {ing}
                  <button
                    onClick={() => onRemove(ing)}
                    className="ml-2 p-0.5 hover:bg-brand-200 rounded-full transition-colors"
                    disabled={isGenerating}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={onGenerate} 
            disabled={ingredients.length === 0} 
            isLoading={isGenerating}
            className="w-full md:w-auto"
          >
            Find Recipes
          </Button>
        </div>
      </div>
    </div>
  );
};