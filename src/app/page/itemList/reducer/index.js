import itemActions from "../action/itemListActions";

export const initialState = {
    itemList: [],
    nextItemId: null,
    nextItemValue: null,
    categoryId: null,
    colorId: null,
    sizeId: null,
    filters: {
        brand: null,
        categoryName: null,
        colorName: null,
        sizeName: null,
        sortingColumn: "creationDate",
        sortingOrder: "DESC",
        minPrice: null,
        maxPrice: null
    },
    isLoading: false,
    gender: null,
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
        case itemActions.setCategoryId: {
            return {
                ...state,
                categoryId: action.categoryId
            };
        }
        case itemActions.setColorId: {
            return {
                ...state,
                colorId: action.colorId
            };
        }
        case itemActions.setSizeId: {
            return {
                ...state,
                sizeId: action.sizeId
            };
        }
        case itemActions.setLoading: {
            return {
                ...state,
                isLoading: action.isLoading
            };
        }
        case itemActions.setGender: {
            return {
                ...state,
                gender: action.gender
            };
        }
        case itemActions.setNextItemValue: {
            return {
                ...state,
                nextItemValue: action.nextItemValue
            };
        }
        case itemActions.setCategoryName:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categoryName: action.categoryName
                }
            };
        case itemActions.setColorName:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    colorName: action.colorName
                }
            };
        case itemActions.setMinPrice:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    minPrice: action.minPrice
                }
            };
        case itemActions.setMaxPrice:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    maxPrice: action.maxPrice
                }
            };
        case itemActions.setSizeName:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sizeName: action.sizeName
                }
            };
        case itemActions.setBrand:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    brand: action.brand
                }
            };
        case itemActions.setSortingColumn:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortingColumn: action.sortingColumn
                }
            };
        case itemActions.setSortingOrder:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    sortingOrder: action.sortingOrder
                }
            };
        case itemActions.resetItemList:
            return {
                ...state,
                itemList: [],
                nextItemId: null,
                nextItemValue: null,
                categoryId: null,
                colorId: null,
                sizeId: null,
                filters: {
                    brand: null,
                    categoryName: null,
                    colorName: null,
                    sizeName: null,
                    sortingColumn: "creationDate",
                    sortingOrder: "DESC",
                    minPrice: null,
                    maxPrice: null
                },
                isLoading: false,
                gender: null,
            };
        case itemActions.resetList:
            return {
                ...state,
                itemList: [],
                nextItemId: null,
                nextItemValue: null
            };
        default:
            return state;
    }
};

export default itemList;
