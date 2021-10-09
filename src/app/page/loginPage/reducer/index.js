import userActions from "../action/userActions";

const initialState = {
    loginCredentials: {
        email: "",
        password: ""
    },
    isLoginSuccessful: null,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.setEmail: {
            return {
                ...state,
                loginCredentials: {
                    ...state.loginCredentials,
                    email: action.email
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
        case userActions.setLoginStatus: {
            return {
                ...state,
                isLoginSuccessful: action.loginStatus
            };
        }

        default:
            return state;
    }
};

export default user;
