import fetch from 'cross-fetch';
import axios from 'axios';

const URL = 'http://localhost:3001/recipes/';

//GET RECIPES
export const getRecipes = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error);
    }

    // return fetch(URL, {
    //     method: 'GET',
    //     mode: 'CORS',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(resp => resp.json())
    //     .catch((error) => console.log(error));
};

//GET DETAILS
export const getRecipeDetails = async (id) => {
    return fetch(`${URL}${id}`, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch((error) => console.log(error));

    // try {
    //     const res = await axios.get(URL + id);
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

//POST
export const postRecipe = (json) => {
    return fetch(URL, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(resp => {
            console.log(json);
        })
        .catch((error) => console.log(error));
};

// DELETE
export const deleteRecipe = (id) => {
    return axios(`${URL}${id}`, {
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
export const putRecipe = (id, json) => {
    return fetch(`${URL}${id}`, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(resp => {
            console.log(json);
        })
        .catch((error) => console.log(error));
};




