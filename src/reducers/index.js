import { combineReducers } from "redux";
import couterReducer from "./couter";
import todoReduces from "./todo";
import userReducer from "./user";
import { cartReducer } from "./cart";
// import userReducer from "./user";
const allReducers  = combineReducers({
    couterReducer,
    todoReduces,
    userReducer,
    cartReducer
    //them nhieu reducer vao day
});
export default allReducers;