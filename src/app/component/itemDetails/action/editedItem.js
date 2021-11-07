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
    const editedItem = getEditedItemDetails(store.getState());
    ItemService.editItem(editedItem).then(() => {
        window.location.href = `/item/${editedItem.itemId}`;
    });
};

export const deleteItem = () => {
    const itemToDelete = getEditedItemDetails(store.getState()).itemId;
    ItemService.deleteItem(itemToDelete).then(() => {
        window.location.href = "/";
    });
};

export const hideItem = () => {
    const itemToDelete = getEditedItemDetails(store.getState()).itemId;
    ItemService.manageItemVisibility(itemToDelete, true).then(() => {
        window.location.href = `/item/${itemToDelete}`;
    });
};

export const showItem = () => {
    const itemToDelete = getEditedItemDetails(store.getState()).itemId;
    ItemService.manageItemVisibility(itemToDelete, false).then(() => {
        window.location.href = `/item/${itemToDelete}`;
    });
};
