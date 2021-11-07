import editedItemActions from "./editedItemActions";
import { ItemService } from "../../../service/ItemService";
import store from "../../../store";
import { getEditedItemDetails } from "../selectors";

export const setEditedItemName = (name) => ({
    type: editedItemActions.setEditedItemName,
    name
});

export const setEditedItemDescription = (description) => ({
    type: editedItemActions.setEditedItemDescription,
    description
});

export const setEditedItemBrand = (brand) => ({
    type: editedItemActions.setEditedItemBrand,
    brand
});

export const setEditedItemCategory = (category) => ({
    type: editedItemActions.setEditedItemCategory,
    category
});

export const setEditedItemId = (itemId) => ({
    type: editedItemActions.setEditedItemId,
    itemId
});

export const setEditedItemProductType = (productType) => ({
    type: editedItemActions.setEditedItemProductType,
    productType
});

export const setEditedItemCategoryGender = (categoryGender) => ({
    type: editedItemActions.setEditedItemCategoryGender,
    categoryGender
});

export const setEditedItemSize = (size) => ({
    type: editedItemActions.setEditedItemSize,
    size
});

export const setEditedItemColor = (color) => ({
    type: editedItemActions.setEditedItemColor,
    color
});

export const setEditedItemGender = (gender) => ({
    type: editedItemActions.setEditedItemGender,
    gender
});

export const setEditedItemPrice = (price) => ({
    type: editedItemActions.setEditedItemPrice,
    price
});

export const editItem = () => {
    ItemService.editItem(getEditedItemDetails(store.getState())).then(() => console.log("dziala"));
};
