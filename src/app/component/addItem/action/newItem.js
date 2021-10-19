import newItemActions from "./newItemActions";

export const setName = (name) => (dispatch) => {
    dispatch({
        type: newItemActions.setName,
        name
    });
};

export const setDescription = (description) => (dispatch) => {
    dispatch({
        type: newItemActions.setDescription,
        description
    });
};

export const setBrand = (brand) => (dispatch) => {
    dispatch({
        type: newItemActions.setBrand,
        brand
    });
};

export const setCategory = (category) => (dispatch) => {
    dispatch({
        type: newItemActions.setCategory,
        category
    });
};

export const setColor = (color) => (dispatch) => {
    dispatch({
        type: newItemActions.setColor,
        color
    });
};

export const setSize = (size) => (dispatch) => {
    dispatch({
        type: newItemActions.setSize,
        size
    });
};

export const setPrice = (price) => (dispatch) => {
    dispatch({
        type: newItemActions.setPrice,
        price
    });
};

export const setType = (itemType) => (dispatch) => {
    dispatch({
        type: newItemActions.setType,
        itemType
    });
};
export const setSex = (sex) => (dispatch) => {
    dispatch({
        type: newItemActions.setSex,
        sex
    });
};
