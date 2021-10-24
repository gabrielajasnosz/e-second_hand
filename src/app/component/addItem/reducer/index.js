import newItemActions from "../action/newItemActions";

const initialState = {
    newItemData: {
        name: "",
        description: null,
        brand: "",
        category: "",
        color: "",
        size: "",
        price: "",
        sex: "",
    },
    type: "",
};

const newItem = (state = initialState, action) => {
    switch (action.type) {
        case newItemActions.setName: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    name: action.name
                }
            };
        }
        case newItemActions.setDescription: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    description: action.description
                }
            };
        }
        case newItemActions.setBrand: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    brand: action.brand
                }
            };
        }
        case newItemActions.setCategory: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    category: action.category
                }
            };
        }
        case newItemActions.setColor: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    color: action.color
                }
            };
        }
        case newItemActions.setSize: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    size: action.size
                }
            };
        }
        case newItemActions.setPrice: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    price: action.price
                }
            };
        }
        case newItemActions.setType: {
            return {
                ...state,
                type: action.itemType
            };
        }
        case newItemActions.setSex: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    sex: action.sex
                }
            };
        }
        default:
            return state;
    }
};

export default newItem;
