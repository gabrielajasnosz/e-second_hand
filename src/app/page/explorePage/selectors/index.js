import { createSelector } from "reselect";

export const getPageData = (state) => state.page;
export const getLoggedInStatus = createSelector(getPageData, (page) => page.isLoggedIn);
