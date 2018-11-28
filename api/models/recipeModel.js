const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'   //matches existing model User in mongodb
    }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;