import headerActions from "./headerActions";
import { CategoryService } from "../../../service/CategoryService";

export const setCategories = (categories) => ({
    type: headerActions.setCategories,
    categories
});

export const fetchCategories = () => (dispatch) => {
    CategoryService.getCategories()
        .then((response) => response.json())
        .then((json) => {
            dispatch(setCategories(json));
        });
};
