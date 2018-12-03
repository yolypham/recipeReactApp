import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    recipeReducer,
    userReducer
});

export default rootReducer;

