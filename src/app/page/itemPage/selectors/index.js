// import { createSelector } from "reselect";

// eslint-disable-next-line import/prefer-default-export
import { createSelector } from "reselect";

export const getItem = (state) => state.item;
export const getItemDetails = createSelector(getItem, (item) => item.item);
