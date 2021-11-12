import itemActions from "../action/itemListActions";

export const initialState = {
    itemList: [],
    nextItemId: null,
    nextItemValue: null,
    filters: {
        categoryId: null,
        brandId: null,
        colorId: null,
        sizeId: null,
    },
    sorting: {
        sortingColumn: "creationDate",
        sortingOrder: "DESC"
    }
};

const itemList = (state = initialState, action) => {
    switch (action.type) {
        case itemActions.setItemList: {
            return {
                ...state,
                itemList: [...state.itemList, ...action.itemList]
            };
        }
        case itemActions.setNextItemId: {
            return {
                ...state,
                nextItemId: action.nextItemId
            };
        }
        case itemActions.setNextItemValue: {
            return {
                ...state,
                nextItemValue: action.nextItemValue
            };
        }
        case itemActions.setCategoryId:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categoryId: state.categoryId
                }
            };
        case itemActions.setColorId:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    colorId: state.colorId
                }
            };
        case itemActions.setSizeId:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sizeId: state.sizeId
                }
            };
        case itemActions.setBrandId:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    brandId: state.brandId
                }
            };
        case itemActions.setSortingColumn:
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    sortingColumn: state.sortingColumn
                }
            };
        case itemActions.setSortingOrder:
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    sortingOrder: state.sortingOrder
                }
            };
        case itemActions.resetItemList:
            return {
                ...state,
                itemList: [],
                nextItemId: null,
                filters: {
                    categoryId: "",
                    brandId: "",
                    colorId: "",
                    sizeId: "",
                },
                sorting: {
                    sortingColumn: "creationDate",
                    sortingOrder: "DESC"
                }
            };
        default:
            return state;
    }
};

export default itemList;
