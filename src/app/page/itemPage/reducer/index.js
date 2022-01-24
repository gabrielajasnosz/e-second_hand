import itemActions from "../action/itemActions";

export const initialState = {
    item: {
        id: null,
        name: null,
        userId: null,
        userDisplayName: null,
        description: null,
        category: null,
        categoryId: null,
        categoryGender: null,
        brand: null,
        brandId: null,
        color: null,
        colorId: null,
        price: null,
        size: null,
        sizeId: null,
        gender: null,
        creationDate: null,
    },
};

const item = (state = initialState, action) => {
    switch (action.type) {
        case itemActions.setItem: {
            return {
                ...state,
                item: action.item
            };
        }
        case itemActions.setItemName: {
            return {
                ...state,
                item: {
                    ...state.item,
                    name: action.name
                }
            };
        }
        case itemActions.setItemDescription: {
            return {
                ...state,
                item: {
                    ...state.item,
                    description: action.description
                }
            };
        }
        case itemActions.setItemCategoryId: {
            return {
                ...state,
                item: {
                    ...state.item,
                    categoryId: action.categoryId
                }
            };
        }
        case itemActions.setItemCategory: {
            return {
                ...state,
                item: {
                    ...state.item,
                    category: action.category
                }
            };
        }
        case itemActions.setItemCategoryGender: {
            return {
                ...state,
                item: {
                    ...state.item,
                    categoryGender: action.categoryGender
                }
            };
        }
        case itemActions.setItemBrand: {
            return {
                ...state,
                item: {
                    ...state.item,
                    brand: action.brand
                }
            };
        }
        case itemActions.setItemColor: {
            return {
                ...state,
                item: {
                    ...state.item,
                    color: action.color
                }
            };
        }
        case itemActions.setItemPrice: {
            return {
                ...state,
                item: {
                    ...state.item,
                    price: action.price
                }
            };
        }
        case itemActions.setItemSize: {
            return {
                ...state,
                item: {
                    ...state.item,
                    size: action.size
                }
            };
        }
        case itemActions.setItemGender: {
            return {
                ...state,
                item: {
                    ...state.item,
                    gender: action.gender
                }
            };
        }

        default:
            return state;
    }
};

export default item;
