import userActions from "../action/userActions";

const initialState = {
    loginCredentials: {
        username: "",
        password: ""
    }
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.setUsername: {
            return {
                ...state,
                loginCredentials: {
                    ...state.loginCredentials,
                    username: action.username
                }
            };
        }
        case userActions.setPassword: {
            return {
                ...state,
                loginCredentials: {
                    ...state.loginCredentials,
                    password: action.password
                }
            };
        }

        default:
            return state;
    }
};

export default user;
