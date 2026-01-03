import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const prompt = `
    I have the following ingredients in my fridge: ${ingredients.join(", ")}.
    Please generate 3 distinct and delicious recipes I can make using these ingredients. 
    You may assume I have basic pantry staples like oil, salt, pepper, sugar, flour, and water.
    Focus on creating a balanced variety (e.g., one quick meal, one comfort food, one healthy option).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the dish" },
              description: { type: Type.STRING, description: "A short, appetizing description" },
              ingredients: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Full list of ingredients with quantities" 
              },
              instructions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Step-by-step cooking instructions" 
              },
              prepTime: { type: Type.STRING, description: "Preparation time e.g. '15 mins'" },
              cookTime: { type: Type.STRING, description: "Cooking time e.g. '30 mins'" },
              servings: { type: Type.INTEGER, description: "Number of servings" },
              difficulty: { type: Type.STRING, description: "Difficulty level (Easy, Medium, Hard)" },
              calories: { type: Type.INTEGER, description: "Approximate calories per serving" },
            },
            required: ["name", "description", "ingredients", "instructions", "prepTime", "difficulty"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as Recipe[];
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes. Please try again.");
  }
};
