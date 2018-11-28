import { getRecipes, postRecipe, deleteRecipe, putRecipe } from '../services/recipeService';
import actionTypes from './actionTypes';

// FETCH_RECIPES
export const loadRecipeType = payload => ({
    type: actionTypes.FETCH_RECIPES,
    payload: payload
});

export const loadRecipes = () => async (dispatch) => {
    const recipes = await getRecipes();
    dispatch(loadRecipeType(recipes.data));
};

// POST_RECIPE
export const addRecipeType = payload => ({
    type: actionTypes.POST_RECIPE,
    payload
});

export const addRecipe = (json) => async (dispatch) => {
    const recipe = await postRecipe(json);
    await dispatch(addRecipeType(recipe));
};

// DELETE_RECIPE
export const deleteRecipeType = payload => ({
    type: actionTypes.DELETE_RECIPE,
    payload: payload
});

export const removeRecipe = (id) => async (dispatch) => {
    console.log('reach action delete');
    const recipe = await deleteRecipe(id);
    await dispatch(deleteRecipeType(recipe));
};

// PUT_RECIPE
export const updateRecipeType = payload => ({
    type: actionTypes.PUT_RECIPE,
    payload
});

export const updateRecipe = (id, json) => async (dispatch) => {
    const recipe = await putRecipe(id, json);
    await dispatch(updateRecipeType(recipe));
};
