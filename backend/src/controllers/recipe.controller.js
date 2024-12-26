const { GoogleGenerativeAI } = require("@google/generative-ai");

const getRecipe = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide a valid array of ingredients." });
  }

  const ingredientList = ingredients.join(", ");
  // const prompt = `Write a detailed recipe for a dish using the following ingredients: ${ingredientList}. Feel free to skip some ingredients or add others if necessary for a balanced and delicious recipe. Include a full list of ingredients and step-by-step instructions.`;
  const prompt = `Write a detailed recipe for a dish using the following ingredients: ${ingredientList}. Format the response as follows: 1. **First Paragraph**: A short description of the dish, including its taste, texture, and any relevant cultural or regional significance. 2. **Second Paragraph**: A full **list of ingredients** used in the recipe. Use bullet points to list each ingredient clearly, and include measurements where applicable. 3. **Third Paragraph**: Provide **detailed step-by-step instructions** for preparing the dish. Use bullet points for each step and include bold headings for major sections like "Preparation", "Cooking", or "Serving". Use bold formatting wherever necessary for clarity (e.g., "Preheat the oven to 180°C" or "Add **1 teaspoon salt** and also give the bold heading for the dish name at top").

Ensure the response is structured, professional, and visually easy to follow with proper formatting.`;
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Recipe fetched successfully",
      recipeText: result?.response?.candidates[0]?.content?.parts[0]?.text,
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return res.status(500).json({
      error: "Failed to generate the recipe. Please try again later.",
    });
  }
};

module.exports = { getRecipe };
