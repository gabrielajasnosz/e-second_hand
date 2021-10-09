import pageActions from "../action/pageActions";

const initialState = {
    isLoggedIn: false
};

const page = (state = initialState, action) => {
    switch (action.type) {
        case pageActions.setLoggedInStatus: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            };
        }

        default:
            return state;
    }
};

export default page;
