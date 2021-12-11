import { createSelector } from "reselect";

export const getHeaderUtils = (state) => state.categories;
export const getSubcategories = createSelector(getHeaderUtils, (categories) => categories.categories);
export const getSizes = createSelector(getHeaderUtils, (categories) => categories.sizes);
export const getBrands = createSelector(getHeaderUtils, (categories) => categories.brands);
export const getColors = createSelector(getHeaderUtils, (categories) => categories.colors);
export const getChatData = createSelector(getHeaderUtils, (header) => header.chat);
export const getMessages = createSelector(getHeaderUtils, (header) => header.messages);
export const getUnreadCounter = createSelector(getHeaderUtils, (header) => header.unreadCounter);
