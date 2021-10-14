import userActions from "../action/userActions";
import registerActions from "../../registerPage/action/registerActions";

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
        case registerActions.resetData: {
            return {
                ...state,
                loginCredentials: {
                    email: "",
                    password: ""
                },
                isLoginSuccessful: null,
            };
        }

        default:
            return state;
    }
};

export default user;
