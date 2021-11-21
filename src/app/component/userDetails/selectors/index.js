import { createSelector } from "reselect";

export const getEditedItem = (state) => state.editedItem;
export const getEditedItemDetails = createSelector(getEditedItem, (editedItem) => editedItem.editedItem);
export const getEditedItemType = createSelector(getEditedItemDetails, (editedItem) => editedItem.productType);
