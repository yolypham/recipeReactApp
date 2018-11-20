import fetch from 'cross-fetch';

const recipeService = () =>
    fetch('http://localhost:3001/recipes', {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .catch((error) => console.log(error));

export default recipeService;

