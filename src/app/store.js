import {
    createStore, combineReducers, applyMiddleware, compose
} from "redux";
import thunk from "redux-thunk";
import user from "./page/loginPage/reducer";
import registerPageData from "./page/registerPage/reducer";
import categories from "./component/header/reducer";
import newItem from "./component/addItem/reducer";
import item from "./page/itemPage/reducer";
import editedItem from "./component/itemDetails/reducer";
import itemList from "./page/itemList/reducer";
import userProfile from "./page/userProfile/reducer";

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
    categories,
    newItem,
    item,
    userProfile,
    itemList,
    editedItem
}), storeEnhancer);

export default store;
