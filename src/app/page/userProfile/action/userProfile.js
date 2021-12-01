import userProfileActions from "./userProfileActions";
import { UserService } from "../../../service/UserService";
import store from "../../../store";
import {
    getCommentsPage, getHasMoreCommentsPage,
    getNextItemId, getNextItemValue, getUserCommentsList, getUserId, getUserItemsList
} from "../selectors";
import { ItemService } from "../../../service/ItemService";
import { CommentService } from "../../../service/CommentService";

export const setUser = (user) => ({
    type: userProfileActions.setUser,
    user
});

export const setItemsLoading = (itemsLoading) => ({
    type: userProfileActions.setItemsLoading,
    itemsLoading
});

export const resetData = () => ({
    type: userProfileActions.resetData
});

export const setHasMoreComments = (hasMoreComments) => ({
    type: userProfileActions.setHasMoreComments,
    hasMoreComments
});

export const setCounters = (counters) => ({
    type: userProfileActions.setCounters,
    counters
});

export const setCommentsLoading = (commentsLoading) => ({
    type: userProfileActions.setCommentsLoading,
    commentsLoading
});

export const setCommentsPage = (commentsPage) => ({
    type: userProfileActions.setCommentsPage,
    commentsPage
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

export const setUserCommentsList = (userCommentsList) => ({
    type: userProfileActions.setUserCommentsList,
    userCommentsList
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

export const getUserComments = () => (dispatch) => {
    const userCommentsList = getUserCommentsList(store.getState());
    const userId = getUserId(store.getState());
    const commentsPage = getCommentsPage(store.getState());
    const hasMoreComments = getHasMoreCommentsPage(store.getState());

    if (hasMoreComments || userCommentsList.length === 0) {
        dispatch(setCommentsLoading(true));
        CommentService.getComments(userId, commentsPage).then((response) => response.json()).then((json) => {
            setTimeout(() => {
                dispatch(setUserCommentsList(json));
                if (json.length !== 5) {
                    dispatch(setHasMoreComments(false));
                } else {
                    dispatch(setCommentsPage(commentsPage + 1));
                }
                dispatch(setCommentsLoading(false));
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

export const getCounters = () => (dispatch) => {
    const id = getUserId(store.getState());
    ItemService.getUserCounters(id).then((response) => response.json())
        .then((json) => {
            dispatch(setCounters(json));
        });
};

export const setUserId = (userId) => (dispatch) => new Promise((resolve) => {
    dispatch({
        type: userProfileActions.setUserId,
        userId
    });

    resolve();
});
