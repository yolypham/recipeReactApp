const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const recipeArray = require('./mock/recipes.json');
const userArray = require('./mock/users.json');

module.exports = async () => {
    try {
        await User.deleteMany();

        let userId = userArray[0];
        let userObj = new User(userId);
        let udoc = await userObj.save();

        //Recipe
        await Recipe.deleteMany();

        await recipeArray.forEach(async recipe => {
            try {
                recipe.user = udoc._id;
                recipeObj = new Recipe(recipe);
                rdoc = await recipeObj.save();
            } catch (error) {
                console.log(error.message)
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}