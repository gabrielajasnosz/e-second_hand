import headerActions from "../action/headerActions";

const initialState = {
    categories: {},
};

const header = (state = initialState, action) => {
    switch (action.type) {
        case headerActions.setCategories: {
            return {
                ...state,
                categories: action.categories
            };
        }
        default:
            return state;
    }
};

export default header;
