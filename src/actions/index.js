import { getRecipes, postRecipe } from '../services/recipeService';
import actionTypes from './actionTypes';

// FETCH_RECIPES
export const getAllRecipes = payload => ({
    type: actionTypes.FETCH_RECIPES,
    payload: payload
});

export const loadRecipes = () => async (dispatch) => {
    const recipes = await getRecipes();
    dispatch(getAllRecipes(recipes));
};

// POST_RECIPE
export const newRecipe = payload => ({
    type: actionTypes.POST_RECIPE,
    payload
});

export const addRecipe = (json) => async (dispatch) => {
    const recipe = await postRecipe(json);
    dispatch(newRecipe(recipe));
};
