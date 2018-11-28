import fetch from 'cross-fetch';
import axios from 'axios';

const URL = 'http://localhost:3001/recipes/';

//GET
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
    axios.delete(`${URL}${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
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




