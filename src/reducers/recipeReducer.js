import { FETCH_RECIPES } from '../actions';

const initialState = [];

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case FETCH_RECIPES:
            return action.payload;
        default:
            return state;
    }
}