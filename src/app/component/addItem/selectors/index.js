import { createSelector } from "reselect";

export const getNewItem = (state) => state.newItem;
export const getNewItemData = createSelector(getNewItem, (newItem) => newItem.newItemData);
export const getNewItemName = createSelector(getNewItemData, (newItem) => newItem.name);
export const getNewItemBrand = createSelector(getNewItemData, (newItem) => newItem.brand);
export const getNewItemCategory = createSelector(getNewItem, (newItem) => newItem.category);
export const getNewItemColor = createSelector(getNewItemData, (newItem) => newItem.colorId);
export const getNewItemPrice = createSelector(getNewItemData, (newItem) => newItem.price);
export const getNewItemSize = createSelector(getNewItemData, (newItem) => newItem.sizeId);
export const getNewItemImages = createSelector(getNewItemData, (newItem) => newItem.images);
export const getNewItemMainImageId = createSelector(getNewItemData, (newItem) => newItem.mainImageId);

export const isNameEmpty = createSelector(getNewItemData, (newItemData) => newItemData.name === "");

export const isBrandEmpty = createSelector(getNewItemData, (newItemData) => newItemData.brand === "");
export const isCategoryIdEmpty = createSelector(getNewItemData, (newItemData) => newItemData.categoryId === "");
export const isColorEmpty = createSelector(getNewItemData, (newItemData) => newItemData.color === "");

export const isSizeEmpty = createSelector(getNewItemData, (newItemData) => newItemData.size === "");
export const isPriceEmpty = createSelector(getNewItemData, (newItemData) => newItemData.price === "");
export const areImagesEmpty = createSelector(getNewItemData, (newItemData) => newItemData.images.length === 0);
// eslint-disable-next-line no-restricted-globals
export const isPriceIncorrect = createSelector(getNewItemData, (newItemData) => newItemData.price !== "" && isNaN(newItemData.price));

export const getType = createSelector(getNewItem, (newItem) => newItem.type);
export const getNewItemSex = createSelector(getNewItemData, (newItem) => newItem.sex);

export const isSexEmpty = createSelector(getNewItemData, (newItem) => newItem.sex === "");
