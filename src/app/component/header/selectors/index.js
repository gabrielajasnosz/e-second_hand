import { createSelector } from "reselect";

export const getHeader = (state) => state.header;
export const getCategories = createSelector(getHeader, (header) => header.categories);
