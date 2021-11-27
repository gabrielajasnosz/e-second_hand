import { createSelector } from "reselect";

export const getUser = (state) => state.userProfile;
export const getUserData = createSelector(getUser, (userProfile) => userProfile.user);
export const getNextItemId = createSelector(getUser, (userProfile) => userProfile.nextItemId);
export const getNextItemValue = createSelector(getUser, (userProfile) => userProfile.nextItemValue);
export const getUserItemsList = createSelector(getUser, (userProfile) => userProfile.userItemsList);
export const getItemsLoading = createSelector(getUser, (userProfile) => userProfile.itemsLoading);
export const getUserId = createSelector(getUser, (userProfile) => userProfile.userId);

export const getUserCommentsList = createSelector(getUser, (userProfile) => userProfile.userCommentsList);
export const getCommentsLoading = createSelector(getUser, (userProfile) => userProfile.commentsLoading);
export const getCommentsPage = createSelector(getUser, (userProfile) => userProfile.commentsPage);
export const getHasMoreCommentsPage = createSelector(getUser, (userProfile) => userProfile.hasMoreComments);
