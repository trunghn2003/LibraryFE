import { combineReducers } from "redux";
import userReducer from "./user";
import { cartReducer } from "./cart";
// import userReducer from "./user";
const allReducers  = combineReducers({
    
    userReducer,
    cartReducer
    //them nhieu reducer vao day
});
export default allReducers;