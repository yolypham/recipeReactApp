import actionTypes from '../actions/actionTypes';

const initialState = {
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER || actionTypes.POST_LOGIN:
            return {
                ...state,
                currentUser: action.payload
            };
        case actionTypes.POST_SIGNOUT:
            console.log('logout action', initialState);
            return {
                ...state,
                currentUser: initialState
            }
        default:
            return state;
    }
}