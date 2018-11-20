const Recipe = require('../models/recipeModel');
const recipeArray = require('./mock/recipes.json');

module.exports = async () => {
    try {
        await Recipe.remove();

        let recipeObj;
        let doc;
        await recipeArray.forEach(async recipe => {
            recipeObj = new Recipe(recipe);
            doc = await recipeObj.save();
            console.log(doc);
        });


    } catch (e) {
        console.log(e.message);
    }
}