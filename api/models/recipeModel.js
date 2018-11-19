const mongoose = require('mongoose');

let recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img: { type: String }
});


const Recipes = mongoose.model('Recipe', recipeSchema);

module.exports = Recipes;