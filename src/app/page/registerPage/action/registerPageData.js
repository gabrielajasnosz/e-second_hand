import registerActions from "./registerActions";
import {
    getRegisterCredentials,
    getEmail
} from "../selectors";
import store from "../../../store";
import { UserService } from "../../../service/UserService";

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

export const setEmailIncorrect = (conflictStatus) => (dispatch) => {
    dispatch({
        type: registerActions.setEmailIncorrect,
        conflictStatus
    });
};

export const setRegistrationMessage = (message) => (dispatch) => {
    dispatch({
        type: registerActions.setRegistrationMessage,
        message
    });
};

const checkEmailValidation = () => {
    console.log(getEmail((store.getState())));
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(getEmail((store.getState())));
};

export const registerUser = () => (dispatch) => {
    if (checkEmailValidation()) {
        UserService.register(getRegisterCredentials(store.getState()))
            .then(((response) => {
                if (response.status === 201) {
                    dispatch(setRegistrationMessage("Your account was successfully created!"));
                    dispatch(setRegistrationStatus(true));
                    dispatch(setEmailIncorrect(null));
                } else if (response.status === 409) {
                    dispatch(setRegistrationStatus(null));
                    dispatch(setEmailIncorrect("Email already in use."));
                } else {
                    dispatch(setRegistrationMessage("Server error - please try again later."));
                    dispatch(setRegistrationStatus(false));
                    dispatch(setEmailIncorrect(null));
                }
            }))
            .catch((error) => {
                console.log(`POST error: ${error}`);
                dispatch(setRegistrationMessage("Server error - please try again later."));
                dispatch(setRegistrationStatus(false));
                dispatch(setEmailIncorrect(null));
            });
    } else {
        dispatch(setEmailIncorrect("Provide correct email value!"));
    }
};

export const setEmail = (email) => (dispatch) => {
    dispatch({
        type: registerActions.setEmail,
        email
    });
    dispatch(setEmailIncorrect(null));
};
