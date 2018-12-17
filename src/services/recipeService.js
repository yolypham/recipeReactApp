import axios from 'axios';


//GET RECIPES
export const getRecipes = async () => {
    try {
        const res = await axios.get('/recipes');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//GET DETAILS
export const getRecipeDetails = async (id) => {
    try {
        const res = await axios.get('/recipes/' + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//POST
export const postRecipe = async (json) => {
    try {
        const res = await axios.post('/recipes', json);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// DELETE
export const deleteRecipe = (id) => {
    return axios(`/recipes/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log(res);
    }).catch((error) => console.log(error));
};

//PUT
export const putRecipe = async (id, json) => {
    try {
        const res = await axios.put(`/recipes/${id}`, json);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};




