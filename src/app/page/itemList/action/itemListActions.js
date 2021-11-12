const prefix = "ITEM_LIST";

const itemActions = {
    setItemList: `${prefix}_SET_ITEM_LIST`,
    setNextItemId: `${prefix}_SET_NEXT_ITEM_ID`,
    setNextItemValue: `${prefix}_SET_NEXT_ITEM_VALUE`,
    setCategoryId: `${prefix}_SET_CATEGORY_ID`,
    setColorId: `${prefix}_SET_COLOR_ID`,
    setBrandId: `${prefix}_SET_BRAND_ID`,
    setSizeId: `${prefix}_SET_SIZE_ID`,
    setSortingColumn: `${prefix}_SET_SORTING_COLUMN`,
    setSortingOrder: `${prefix}_SET_SORTING_ORDER`,
    resetItemList: `${prefix}_RESET_ITEM_LIST`,
};

export default itemActions;
