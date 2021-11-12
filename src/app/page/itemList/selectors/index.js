import { createSelector } from "reselect";

export const getItemList = (state) => state.itemList;
export const getItemListItems = createSelector(getItemList, (itemList) => itemList.itemList);
export const getNextItemId = createSelector(getItemList, (itemList) => itemList.nextItemId);
export const getItemDetails = createSelector(getItemList, (item) => item.item);
