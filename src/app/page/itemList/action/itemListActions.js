const prefix = "ITEM_LIST";

const itemActions = {
    setItemList: `${prefix}_SET_ITEM_LIST`,
    setNextItemId: `${prefix}_SET_NEXT_ITEM_ID`,
    setNextItemValue: `${prefix}_SET_NEXT_ITEM_VALUE`,
    setCategoryId: `${prefix}_SET_CATEGORY_ID`,
    setColorId: `${prefix}_SET_COLOR_ID`,
    setSizeId: `${prefix}_SET_SIZE_ID`,
    setLoading: `${prefix}_SET_LOADING`,
    setFilters: `${prefix}_SET_FILTERS`,
    setSortingColumn: `${prefix}_SET_SORTING_COLUMN`,
    setBrandName: `${prefix}_SET_BRAND_NAME`,
    setBrandId: `${prefix}_SET_BRAND_ID`,
    setCategoryName: `${prefix}_SET_CATEGORY_NAME`,
    setSavedFilters: `${prefix}_SET_SAVED_FILTERS`,
    setMinPrice: `${prefix}_SET_MIN_PRICE`,
    setMaxPrice: `${prefix}_SET_MAX_PRICE`,
    setColorName: `${prefix}_SET_COLOR_NAME`,
    setSizeName: `${prefix}_SET_SIZE_NAME`,
    setSortingOrder: `${prefix}_SET_SORTING_ORDER`,
    setGender: `${prefix}_SET_GENDER`,
    resetList: `${prefix}_RESET_LIST`,
    resetItemList: `${prefix}_RESET_ITEM_LIST`,
    setFiltersLoading: `${prefix}_SET_FILTERS_LOADING`,
    setOnlyFollowedUsers: `${prefix}_SET_ONLY_FOLLOWED_USERS`,
};

export default itemActions;
