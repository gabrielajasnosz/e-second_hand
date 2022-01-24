import itemActions from "../action/itemListActions";

export const initialState = {
    itemList: [],
    nextItemId: null,
    nextItemValue: null,
    categoryId: null,
    colorId: null,
    brandId: null,
    sizeId: null,
    filters: {
        brandName: null,
        categoryName: null,
        colorName: null,
        sizeName: null,
        sortingColumn: "creationDate",
        sortingOrder: "DESC",
        minPrice: null,
        maxPrice: null,
        onlyFollowedUsers: false
    },
    isLoading: false,
    gender: null,
    savedFilters: [],
    filtersLoading: false,
};

const itemList = (state = initialState, action) => {
    switch (action.type) {
        case itemActions.setItemList: {
            return {
                ...state,
                itemList: [...state.itemList, ...action.itemList]
            };
        }
        case itemActions.setFiltersLoading: {
            return {
                ...state,
                filtersLoading: action.filtersLoading
            };
        }
        case itemActions.setSavedFilters: {
            return {
                ...state,
                savedFilters: action.savedFilters
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
        case itemActions.setOnlyFollowedUsers:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    onlyFollowedUsers: action.onlyFollowedUsers
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
        case itemActions.setBrandName:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    brandName: action.brandName
                }
            };
        case itemActions.setBrandId:
            return {
                ...state,
                brandId: action.brandId
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
        case itemActions.setFilters:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    brandName: action.filter.brandDto ? action.filter.brandDto.name : null,
                    categoryName: action.filter.categoryDto ? action.filter.categoryDto.name : null,
                    colorName: action.filter.colorDto ? action.filter.colorDto.name : null,
                    sizeName: action.filter.sizeDto ? action.filter.sizeDto.name : null,
                    sortingColumn: action.filter.sortingColumn,
                    sortingOrder: action.filter.sortingOrder,
                    minPrice: action.filter.minPrice,
                    maxPrice: action.filter.maxPrice,
                },
                gender: action.filter.gender,
                categoryId: action.filter.categoryDto ? action.filter.categoryDto.id : null,
                colorId: action.filter.colorDto ? action.filter.colorDto.id : null,
                brandId: action.filter.brandDto ? action.filter.brandDto.id : null,
                sizeId: action.filter.sizeDto ? action.filter.sizeDto.id : null,
            };
        case itemActions.resetItemList:
            return {
                ...state,
                itemList: [],
                nextItemId: null,
                nextItemValue: null,
                categoryId: null,
                colorId: null,
                brandId: null,
                sizeId: null,
                filters: {
                    brandName: null,
                    categoryName: null,
                    colorName: null,
                    sizeName: null,
                    sortingColumn: "creationDate",
                    onlyFollowedUsers: false,
                    sortingOrder: "DESC",
                    minPrice: null,
                    maxPrice: null
                },
                isLoading: false,
                gender: null,
                savedFilters: [],
                filtersLoading: false,
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
