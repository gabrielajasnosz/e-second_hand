import { createSelector } from "reselect";

export const getNewItem = (state) => state.newItem;
export const getNewItemData = createSelector(getNewItem, (newItem) => newItem.newItemData);
export const getNewItemName = createSelector(getNewItemData, (newItem) => newItem.name);
export const getNewItemBrand = createSelector(getNewItemData, (newItem) => newItem.brand);
export const getNewItemCategory = createSelector(getNewItemData, (newItem) => newItem.category);
export const getNewItemColor = createSelector(getNewItemData, (newItem) => newItem.color);
export const getNewItemPrice = createSelector(getNewItemData, (newItem) => newItem.price);
export const getNewItemSize = createSelector(getNewItemData, (newItem) => newItem.size);

export const isNameEmpty = createSelector(getNewItemData, (newItemData) => newItemData.name === "");

export const isBrandEmpty = createSelector(getNewItemData, (newItemData) => newItemData.brand === "");
export const isCategoryEmpty = createSelector(getNewItemData, (newItemData) => newItemData.category === "");
export const isColorEmpty = createSelector(getNewItemData, (newItemData) => newItemData.color === "");

export const isSizeEmpty = createSelector(getNewItemData, (newItemData) => newItemData.size === "");
export const isPriceEmpty = createSelector(getNewItemData, (newItemData) => newItemData.price === "");

export const getType = createSelector(getNewItem, (newItem) => newItem.type);
export const getSex = createSelector(getNewItem, (newItem) => newItem.sex);

export const isTypeEmpty = createSelector(getNewItem, (newItem) => newItem.type === "");
export const isSexEmpty = createSelector(getNewItem, (newItem) => newItem.sex === "");
