import { getRecipes, getRecipeDetails, postRecipe, deleteRecipe, putRecipe } from '../services/recipeService';
import { getUser } from '../services/userService';
import actionTypes from './actionTypes';

// FETCH_USER
export const loadUserActionType = payload => ({
    type: actionTypes.FETCH_USER,
    payload: payload
});


export const loadUser = (userid) => async (dispatch) => {
    const user = await getUser(userid);
    dispatch(loadUserActionType(user.data));
};



// FETCH_RECIPES
export const loadRecipesActionType = payload => ({
    type: actionTypes.FETCH_RECIPES,
    payload: payload
});


export const loadRecipes = () => async (dispatch) => {
    const recipes = await getRecipes();
    dispatch(loadRecipesActionType(recipes.data));
};

// FETCH_RECIPE_DETAILS
export const loadDetailsActionType = payload => ({
    type: actionTypes.FETCH_RECIPE_DETAILS,
    payload: payload
});

export const loadRecipeDetails = (id) => async (dispatch) => {
    const recipe = await getRecipeDetails(id);
    dispatch(loadDetailsActionType(recipe.data));
};

// POST_RECIPE
export const addRecipeActionType = payload => ({
    type: actionTypes.POST_RECIPE,
    payload
});

export const addRecipe = (json) => async (dispatch) => {
    const recipe = await postRecipe(json);
    await dispatch(addRecipeActionType(recipe));
};

// DELETE_RECIPE
export const deleteRecipeActionType = payload => ({
    type: actionTypes.DELETE_RECIPE,
    payload: payload
});

export const removeRecipe = (id) => async (dispatch) => {
    console.log('reach action delete');
    const recipe = await deleteRecipe(id);
    await dispatch(deleteRecipeActionType(recipe));
};

// PUT_RECIPE
export const updateRecipeActionType = payload => ({
    type: actionTypes.PUT_RECIPE,
    payload
});

export const updateRecipe = (id, json) => async (dispatch) => {
    const recipe = await putRecipe(id, json);
    await dispatch(updateRecipeActionType(recipe));
};
