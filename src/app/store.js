import {
    createStore, combineReducers, applyMiddleware, compose
} from "redux";
import thunk from "redux-thunk";
import user from "./page/loginPage/reducer";
import registerPageData from "./page/registerPage/reducer";
import page from "./page/explorePage/reducer";
import categories from "./component/header/reducer";
import newItem from "./component/addItem/reducer";
import item from "./page/itemPage/reducer";

const areReduxDevtoolsAvailable = !["production", "test"].includes(process.env.NODE_ENV)
    && window.__REDUX_DEVTOOLS_EXTENSION__;
const storeEnhancer = areReduxDevtoolsAvailable
    ? compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : compose(applyMiddleware(thunk));

const store = createStore(combineReducers({
    user,
    registerPageData,
    page,
    categories,
    newItem,
    item
}), storeEnhancer);

export default store;
