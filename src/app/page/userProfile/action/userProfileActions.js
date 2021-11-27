const prefix = "ITEM";

const userProfileActions = {
    setUser: `${prefix}_SET_USER`,
    setNextItemId: `${prefix}_SET_NEXT_ITEM_ID`,
    setNextItemValue: `${prefix}_SET_NEXT_ITEM_VALUE`,
    setUserItemsList: `${prefix}_SET_USER_ITEMS_LIST`,
    setItemsLoading: `${prefix}_SET_ITEMS_LOADING`,
    setCommentsLoading: `${prefix}_SET_COMMENTS_LOADING`,
    setCommentsPage: `${prefix}_SET_COMMENTS_PAGE`,
    setUserCommentsList: `${prefix}_SET_USER_COMMENTS_LIST`,
    setHasMoreComments: `${prefix}_SET_HAS_MORE_COMMENTS`,
    setUserId: `${prefix}_SET_USER_ID`
};

export default userProfileActions;
