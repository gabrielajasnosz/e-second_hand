import { createSelector } from "reselect";

export const getUser = (state) => state.user;
export const getLoginCredential = createSelector(getUser, (user) => user.loginCredentials);
