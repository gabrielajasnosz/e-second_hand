import newItemActions from "./newItemActions";
// eslint-disable-next-line no-unused-vars
import { ItemService } from "../../../service/ItemService";
import { getNewItemData, getNewItemMainImageId } from "../selectors";
import store from "../../../store";

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

export const resetData = () => (dispatch) => {
    dispatch({
        type: newItemActions.resetData,
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

export const setImages = (images) => (dispatch) => {
    dispatch({
        type: newItemActions.setImages,
        images
    });
};

export const setCategoryId = (categoryId) => (dispatch) => {
    dispatch({
        type: newItemActions.setCategoryId,
        categoryId
    });
};

export const setMainImageId = (mainImageId) => (dispatch) => {
    dispatch({
        type: newItemActions.setMainImageId,
        mainImageId
    });
};

export const saveItem = () => () => {
    const data = getNewItemData(store.getState());
    const mainImageId = getNewItemMainImageId(store.getState());
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.description !== null && data.description !== "") {
        formData.append("description", data.description);
    }
    formData.append("categoryId", data.categoryId);
    formData.append("colorId", data.colorId);
    formData.append("sizeId", data.sizeId);
    formData.append("price", data.price);
    formData.append("sex", data.sex);
    formData.append("brand", data.brand);
    formData.append("mainImage", data.images[mainImageId]);

    data.images.splice(mainImageId, 1);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(data.images)) {
        if (key !== "length") {
            formData.append("images", data.images[key]);
        }
    }

    // eslint-disable-next-line no-return-assign
    ItemService.saveItem(formData).then((json) => window.location.href = `/item/${json}`);
};
