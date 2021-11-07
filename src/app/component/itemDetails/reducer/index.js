import editedItemActions from "../action/editedItemActions";

export const initialState = {
    editedItem: {
        itemId: null,
        name: null,
        description: null,
        category: null,
        categoryGender: null,
        brand: null,
        color: null,
        price: null,
        size: null,
        gender: null,
        productType: null
    },
};

const editedItem = (state = initialState, action) => {
    switch (action.type) {
        case editedItemActions.setEditedItemName: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    name: action.name
                }
            };
        }
        case editedItemActions.setEditedItemProductType: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    productType: action.productType
                }
            };
        }
        case editedItemActions.setEditedItemId: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    itemId: action.itemId
                }
            };
        }
        case editedItemActions.setEditedItemDescription: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    description: action.description
                }
            };
        }
        case editedItemActions.setEditedItemCategory: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    category: action.category
                }
            };
        }
        case editedItemActions.setEditedItemBrand: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    brand: action.brand
                }
            };
        }
        case editedItemActions.setEditedItemColor: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    color: action.color
                }
            };
        }
        case editedItemActions.setEditedItemCategoryGender: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    categoryGender: action.categoryGender
                }
            };
        }
        case editedItemActions.setEditedItemPrice: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    price: action.price
                }
            };
        }
        case editedItemActions.setEditedItemSize: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    size: action.size
                }
            };
        }
        case editedItemActions.setEditedItemGender: {
            return {
                ...state,
                editedItem: {
                    ...state.editedItem,
                    gender: action.gender
                }
            };
        }

        default:
            return state;
    }
};

export default editedItem;
