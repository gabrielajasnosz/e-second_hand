import userActions from "./userActions";
import { UserService } from "../../../service/UserService";

import store from "../../../store";
import { getLoginCredentials } from "../selectors";

export const setEmail = (email) => ({
    type: userActions.setEmail,
    email
});

export const setPassword = (password) => ({
    type: userActions.setPassword,
    password
});
export const setLoginStatus = (loginStatus) => ({
    type: userActions.setLoginStatus,
    loginStatus
});
export const resetData = () => ({
    type: userActions.resetData,
});

export const login = () => (dispatch) => {
    UserService.login(getLoginCredentials(store.getState()))
        .then(() => {
            dispatch(setLoginStatus(true));
            window.location.href = "/";
        })
        .catch(() => {
            dispatch(setLoginStatus(false));
        });
};
