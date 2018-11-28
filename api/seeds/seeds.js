const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const recipeArray = require('./mock/recipes.json');
const userArray = require('./mock/users.json');

// const axios = require('axios');
// const { PORT } = require('../utils/constants')
// const userURL = `http://localhost:${PORT}/users/`;
// const recipeURL = `http://localhost:${PORT}/recipes/patch-user/`;

// AssignUserToRecipes = async () => {
//     console.log('assign....')
//     try {
//         const res = await axios.get(userURL);
//         const oneUser = res[0]._id;
//         console.log(oneUser);
//         await axios.patch(`${URL}${oneUser}`)
//     } catch (e) {
//         console.log(e)
//     }
// }

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

        /*let users = await Promise.all()

        await userArray.forEach(async user => {
            try {
                let userObj = new User(user);
                let udoc = await userObj.save();

                oneUser = udoc.id;
                let array = [];
                array.push(oneUser);
                return array;
                console.log(oneUser);
            } catch (error) {
                console.log(error.message)
            }
        });


        console.log(`Will assign all recipes to ${oneUser}`);

        //Recipe
        await Recipe.deleteMany();

        let recipeObj;
        let rdoc;
        await recipeArray.forEach(async recipe => {
            try {

                recipe.user = oneUser;
                console.log(recipe);
                recipeObj = new Recipe(recipe);
                rdoc = await recipeObj.save();
                //console.log(rdoc);
            } catch (error) {
                console.log(error.message)
            }

        });*/

    } catch (e) {
        console.log(e.message);
    }
}