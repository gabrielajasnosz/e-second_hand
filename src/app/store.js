import { createStore, combineReducers } from "redux";
import user from "./page/loginPage/reducer";

const store = createStore(combineReducers({
    user
}));

export default store;
