import itemActions from "./itemActions";
import { ItemService } from "../../../service/ItemService";

export const setItem = (item) => ({
    type: itemActions.setItem,
    item
});

export const setItemName = (name) => ({
    type: itemActions.setItemName,
    name
});

export const getItem = (id) => (dispatch) => {
    ItemService.getItem(id).then((response) => response.json()).then((json) => {
        dispatch(setItem(json));
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_NAME", name: json.name });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_DESCRIPTION", description: json.description });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_CATEGORY", category: json.category });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_CATEGORY_GENDER", categoryGender: json.categoryGender });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_PRODUCT_TYPE", productType: json.productType });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_SIZE", size: json.size });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_COLOR", color: json.color });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_BRAND", brand: json.brand });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_PRICE", price: json.price });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_GENDER", gender: json.gender });
        dispatch({ type: "EDITED_ITEM_SET_EDITED_ITEM_ID", itemId: json.id });
    });
};
