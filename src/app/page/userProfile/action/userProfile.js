import userProfileActions from "./userProfileActions";
import { UserService } from "../../../service/UserService";
import store from "../../../store";
import {
    getNextItemId, getNextItemValue, getUserId, getUserItemsList
} from "../selectors";
import { ItemService } from "../../../service/ItemService";

export const setUser = (user) => ({
    type: userProfileActions.setUser,
    user
});

export const setItemsLoading = (itemsLoading) => ({
    type: userProfileActions.setItemsLoading,
    itemsLoading
});

export const setNextItemId = (nextItemId) => ({
    type: userProfileActions.setNextItemId,
    nextItemId
});
export const setNextItemValue = (nextItemValue) => ({
    type: userProfileActions.setNextItemValue,
    nextItemValue
});

export const setUserItemsList = (userItemsList) => ({
    type: userProfileActions.setUserItemsList,
    userItemsList
});

export const getUserItems = () => (dispatch) => {
    const nextItemId = getNextItemId(store.getState());
    const nextItemValue = getNextItemValue(store.getState());
    const userItemsList = getUserItemsList(store.getState());
    const userId = getUserId(store.getState());

    const filterObject = {
        userId,
        nextItemId,
        nextItemValue,
        pageSize: 5
    };

    if (nextItemId !== null || userItemsList.length === 0) {
        dispatch(setItemsLoading(true));
        ItemService.getItems(filterObject).then((response) => response.json()).then((json) => {
            setTimeout(() => {
                dispatch(setUserItemsList(json.itemList));
                dispatch(setNextItemId(json.nextItemId));
                dispatch(setNextItemValue(json.nextItemValue));
                dispatch(setItemsLoading(false));
            }, 2000);
        });
    }
    return true;
};

export const getUser = () => (dispatch) => {
    const id = getUserId(store.getState());
    UserService.getUser(id).then((response) => response.json()).then((json) => {
        dispatch(setUser(json));
    });
};

export const setUserId = (userId) => (dispatch) => new Promise((resolve) => {
    dispatch({
        type: userProfileActions.setUserId,
        userId
    });

    resolve();
});
