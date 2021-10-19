import categoriesActions from "./categoriesActions";
import { CategoryService } from "../../../service/CategoryService";

export const setCategories = (categories) => ({
    type: categoriesActions.setCategories,
    categories
});

export const setBrands = (brands) => ({
    type: categoriesActions.setBrands,
    brands
});

export const setSizes = (sizes) => ({
    type: categoriesActions.setSizes,
    sizes
});

export const fetchCategories = () => (dispatch) => {
    CategoryService.getCategories()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setCategories(json));
        });
};

export const fetchSizes = () => (dispatch) => {
    CategoryService.getSizes()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setSizes(json));
        });
};

export const fetchBrands = () => (dispatch) => {
    CategoryService.getBrands()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setBrands(json));
        });
};
