import actionTypes from '../actions/actionTypes';

const initialState = {
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}