import userActions from "./userActions";

export const setUsername = (username) => ({
    type: userActions.setUsername,
    username
});

export const setPassword = (password) => ({
    type: userActions.setUsername,
    password
});
