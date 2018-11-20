import fetchRecipes from '../services/recipeService';

export const FETCH_RECIPES = 'FETCH_RECIPES';

export const getRecipes = payload => ({
    type: FETCH_RECIPES,
    payload
});

export const loadRecipes = () => async (dispatch) => {
    console.log('loadRecipes...');
    const recipes = await fetchRecipes();
    dispatch(getRecipes(recipes));
};