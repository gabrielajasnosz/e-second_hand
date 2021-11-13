import { createSelector } from "reselect";

export const getItemList = (state) => state.itemList;
export const getItemListItems = createSelector(getItemList, (itemList) => itemList.itemList);
export const getNextItemId = createSelector(getItemList, (itemList) => itemList.nextItemId);
export const getLoading = createSelector(getItemList, (itemList) => itemList.isLoading);
export const getFilters = createSelector(getItemList, (itemList) => itemList.filters);
// eslint-disable-next-line max-len
export const getActiveFilters = createSelector(getFilters, (activeFilters) => Object.entries(activeFilters).filter(([, value]) => value !== null).map(([name, value]) => ({ name, value })));
