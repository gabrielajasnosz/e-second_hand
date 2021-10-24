import { createSelector } from "reselect";

export const getCategories = (state) => state.categories;
export const getSubcategories = createSelector(getCategories, (categories) => categories.categories);
export const getSizes = createSelector(getCategories, (categories) => categories.sizes);
export const getBrands = createSelector(getCategories, (categories) => categories.brands);
export const getColors = createSelector(getCategories, (categories) => categories.colors);
