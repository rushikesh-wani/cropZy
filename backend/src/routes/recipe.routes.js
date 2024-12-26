const express = require("express");
const { getRecipe } = require("../controllers/recipe.controller");
const auth = require("../middlewares/auth");
const customerAuth = require("../middlewares/customerAuth");

const recipeRouter = express.Router();

// END-POINT - POST /signup => user signup
recipeRouter.post("/get-recipe", auth, customerAuth, getRecipe);

module.exports = recipeRouter;
