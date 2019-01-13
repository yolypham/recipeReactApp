import { getRecipes, getRecipeDetails, postRecipe, deleteRecipe, putRecipe } from '../services/recipeService';
import { getUser, getCurrentUser, postLogin, postNewRegistration } from '../services/userService';
import actionTypes from './actionTypes';

// POST_SIGNUP
export const submitNewRegistration = (json) => async (dispatch) => {
    const user = await postNewRegistration(json);
    await dispatch(newUserActionType(user));
};

export const newUserActionType = payload => ({
    type: actionTypes.POST_SIGNUP,
    payload
});

// POST_LOGIN
export const submitLogin = (json) => async (dispatch) => {
    const user = await postLogin(json);
    await dispatch(loadUserActionType(actionTypes.POST_LOGIN, user));
};

// POST_SIGNOUT
export const logout = () => (dispatch) => {
    dispatch(loadUserActionType(actionTypes.POST_SIGNOUT, null));
};

// FETCH_USER
export const loadUser = (userid) => async (dispatch) => {
    const user = await getUser(userid);
    dispatch(loadUserActionType(actionTypes.FETCH_USER, user));
};

// FETCH_USER (current via token)
export const findCurrentUser = (token) => async (dispatch) => {
    const user = await getCurrentUser(token);
    dispatch(loadUserActionType(actionTypes.FETCH_USER, user));
};

export const loadUserActionType = (actionType, payload) => ({
    type: actionType,
    payload: payload
});

// FETCH_RECIPES
export const loadRecipes = () => async (dispatch) => {
    const recipes = await getRecipes();
    dispatch(loadRecipesActionType(recipes.data));
};

export const loadRecipesActionType = payload => ({
    type: actionTypes.FETCH_RECIPES,
    payload: payload
});

// FETCH_RECIPE_DETAILS
export const loadRecipeDetails = (id) => async (dispatch) => {
    const recipe = await getRecipeDetails(id);
    dispatch(loadDetailsActionType(recipe.data));
};

export const loadDetailsActionType = payload => ({
    type: actionTypes.FETCH_RECIPE_DETAILS,
    payload: payload
});

// POST_RECIPE
export const addRecipe = (json) => async (dispatch) => {
    const recipe = await postRecipe(json);
    await dispatch(addRecipeActionType(recipe));
};

export const addRecipeActionType = payload => ({
    type: actionTypes.POST_RECIPE,
    payload
});

// DELETE_RECIPE
export const removeRecipe = (id) => async () => {
    await deleteRecipe(id);
};

// PUT_RECIPE
export const updateRecipe = (id, json) => async (dispatch) => {
    const recipe = await putRecipe(id, json);
    await dispatch(updateRecipeActionType(recipe));
};

export const updateRecipeActionType = payload => ({
    type: actionTypes.PUT_RECIPE,
    payload
});