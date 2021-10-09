import registerActions from "../action/registerActions";

const initialState = {
    registerCredentials: {
        displayName: "",
        password: "",
        email: "",
    },
    isRegistrationSuccessful: null,
    registrationMessage: null,
    isEmailIncorrect: null,
};

const registerPageData = (state = initialState, action) => {
    switch (action.type) {
        case registerActions.setDisplayName: {
            return {
                ...state,
                registerCredentials: {
                    ...state.registerCredentials,
                    displayName: action.displayName
                }
            };
        }
        case registerActions.setEmail: {
            return {
                ...state,
                registerCredentials: {
                    ...state.registerCredentials,
                    email: action.email
                }
            };
        }
        case registerActions.setPassword: {
            return {
                ...state,
                registerCredentials: {
                    ...state.registerCredentials,
                    password: action.password
                }
            };
        }
        case registerActions.setRegistrationStatus: {
            return {
                ...state,
                isRegistrationSuccessful: action.registrationStatus
            };
        }
        case registerActions.setRegistrationMessage: {
            return {
                ...state,
                registrationMessage: action.message
            };
        }
        case registerActions.setEmailIncorrect: {
            return {
                ...state,
                isEmailIncorrect: action.conflictStatus
            };
        }

        case registerActions.resetData: {
            return {
                ...state,
                isEmailConflicted: false,
                registrationMessage: null,
                isRegistrationSuccessful: null,
                registerCredentials: {
                    displayName: "",
                    password: "",
                    email: ""
                }
            };
        }

        default:
            return state;
    }
};

export default registerPageData;
