import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';


const rootReducer = combineReducers({
    recipeReducer: recipeReducer
});

export default rootReducer;

