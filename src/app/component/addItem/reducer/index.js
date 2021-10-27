import newItemActions from "../action/newItemActions";

const initialState = {
    newItemData: {
        name: "",
        description: null,
        brand: "",
        categoryId: "",
        colorId: "",
        sizeId: "",
        price: "",
        sex: "",
        images: []
    },
    type: "",
    category: "",
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
                category: action.category
            };
        }
        case newItemActions.setCategoryId: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    categoryId: action.categoryId
                }
            };
        }
        case newItemActions.setColor: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    colorId: action.color
                }
            };
        }
        case newItemActions.setSize: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    sizeId: action.size
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
        case newItemActions.setImages: {
            return {
                ...state,
                newItemData: {
                    ...state.newItemData,
                    images: action.images
                }
            };
        }
        case newItemActions.resetData: {
            return {
                ...state,
                newItemData: {
                    name: "",
                    description: null,
                    brand: "",
                    categoryId: "",
                    colorId: "",
                    sizeId: "",
                    price: "",
                    sex: "",
                    images: ""
                },
                type: "",
                category: "",
            };
        }
        default:
            return state;
    }
};

export default newItem;
