import { createSelector } from "reselect";

export const getRegisterPageData = (state) => state.registerPageData;
export const getRegisterCredentials = createSelector(getRegisterPageData, (registerPageData) => registerPageData.registerCredentials);
export const getPassword = createSelector(getRegisterCredentials, (registerCredentials) => registerCredentials.password);
export const getEmail = createSelector(getRegisterCredentials, (registerCredentials) => registerCredentials.email);
export const getDisplayName = createSelector(getRegisterCredentials, (registerCredentials) => registerCredentials.displayName);
export const getPasswordValidation = createSelector(getRegisterCredentials, (registerCredentials) => {
    if (registerCredentials.password === "") {
        return true;
    }
    return false;
});

export const getEmailValidation = createSelector(getRegisterCredentials, (registerCredentials) => {
    if (registerCredentials.email === "") {
        return true;
    }
    return false;
});

export const getDisplayNameValidation = createSelector(getRegisterCredentials, (registerCredentials) => {
    if (registerCredentials.displayName === "") {
        return true;
    }
    return false;
});

export const getRegistrationStatus = createSelector(getRegisterPageData, (registerPageData) => registerPageData.isRegistrationSuccessful);
export const getEmailConflictStatus = createSelector(getRegisterPageData, (registerPageData) => registerPageData.isEmailIncorrect);
export const getRegistrationMessage = createSelector(getRegisterPageData, (registerPageData) => registerPageData.registrationMessage);
