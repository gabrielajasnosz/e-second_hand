import categoriesActions from "../action/categoriesActions";

const initialState = {
    categories: null,
    brands: null,
    sizes: null
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case categoriesActions.setCategories: {
            return {
                ...state,
                categories: action.categories
            };
        }
        case categoriesActions.setBrands: {
            return {
                ...state,
                brands: action.brands
            };
        }
        case categoriesActions.setSizes: {
            return {
                ...state,
                sizes: action.sizes
            };
        }
        default:
            return state;
    }
};

export default categories;
