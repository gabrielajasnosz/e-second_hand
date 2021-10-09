import { createSelector } from "reselect";

export const getUser = (state) => state.user;
export const getLoginCredentials = createSelector(getUser, (user) => user.loginCredentials);
export const getEmail = createSelector(getUser, (user) => user.loginCredentials.email);
export const getPassword = createSelector(getUser, (user) => user.loginCredentials.password);

export const isLoginSuccessful = createSelector(getUser, (user) => user.isLoginSuccessful);

export const getPasswordValidation = createSelector(getLoginCredentials, (loginCredentials) => {
    if (loginCredentials.password === "") {
        return true;
    }
    return false;
});

export const getEmailValidation = createSelector(getLoginCredentials, (loginCredentials) => {
    if (loginCredentials.email === "") {
        return true;
    }
    return false;
});
