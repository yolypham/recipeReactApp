import actionTypes from '../actions/actionTypes';

const initialState = {
    recipes: [],
    recipe: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case actionTypes.POST_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };
        case actionTypes.DELETE_RECIPE:
            return {
                ...state,
                recipes: action.payload
            };
        default:
            return state;
    }
}