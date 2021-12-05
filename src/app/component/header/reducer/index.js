import headerActions from "../action/headerActions";

const initialState = {
    categories: null,
    brands: null,
    sizes: null,
    colors: null,
    chat: [],
    messages: []
};

const header = (state = initialState, action) => {
    switch (action.type) {
        case headerActions.setCategories: {
            return {
                ...state,
                categories: action.categories
            };
        }
        case headerActions.setBrands: {
            return {
                ...state,
                brands: action.brands
            };
        }
        case headerActions.setSizes: {
            return {
                ...state,
                sizes: action.sizes
            };
        }
        case headerActions.setColors: {
            return {
                ...state,
                colors: action.colors
            };
        }
        case headerActions.setChat: {
            return {
                ...state,
                chat: action.chat
            };
        }
        case headerActions.setMessages: {
            return {
                ...state,
                messages: action.messages
            };
        }
        default:
            return state;
    }
};

export default header;
