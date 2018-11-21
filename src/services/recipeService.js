import fetch from 'cross-fetch';

export const getRecipes = () => {
    return fetch('http://localhost:3001/recipes', {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch((error) => console.log(error));
};

export const postRecipe = (json) => {
    return fetch('http://localhost:3001/recipes', {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(resp => console.log(json))
        .catch((error) => console.log(error));
};

