import registerActions from "./registerActions";
import {
    getRegisterCredentials
} from "../selectors";
import store from "../../../store";
import UserService from "../../../service/UserService";

export const setPassword = (password) => (dispatch) => {
    dispatch({
        type: registerActions.setPassword,
        password
    });
};

export const resetData = () => (dispatch) => {
    dispatch({
        type: registerActions.resetData,
    });
};

export const setDisplayName = (displayName) => (dispatch) => {
    dispatch({
        type: registerActions.setDisplayName,
        displayName
    });
};

export const setRegistrationStatus = (registrationStatus) => (dispatch) => {
    dispatch({
        type: registerActions.setRegistrationStatus,
        registrationStatus
    });
};

export const setEmailConflictStatus = (conflictStatus) => (dispatch) => {
    dispatch({
        type: registerActions.setEmailConflictStatus,
        conflictStatus
    });
};

export const setRegistrationMessage = (message) => (dispatch) => {
    dispatch({
        type: registerActions.setRegistrationMessage,
        message
    });
};

export const registerUser = () => (dispatch) => {
    UserService.register(getRegisterCredentials(store.getState()))
        .then(((response) => {
            if (response.status === 201) {
                dispatch(setRegistrationMessage("Your account was successfully created!"));
                dispatch(setRegistrationStatus(true));
                dispatch(setEmailConflictStatus(false));
            } else if (response.status === 409) {
                dispatch(setRegistrationStatus(null));
                dispatch(setEmailConflictStatus(true));
            } else {
                dispatch(setRegistrationMessage("Server error - please try again later."));
                dispatch(setRegistrationStatus(false));
                dispatch(setEmailConflictStatus(false));
            }
        }))
        .catch((error) => {
            console.log(`POST error: ${error}`);
            dispatch(setRegistrationMessage("Server error - please try again later."));
            dispatch(setRegistrationStatus(false));
            dispatch(setEmailConflictStatus(false));
        });
};

export const setEmail = (email) => (dispatch) => {
    dispatch({
        type: registerActions.setEmail,
        email
    });
    dispatch(setEmailConflictStatus(false));
};
