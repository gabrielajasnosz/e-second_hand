import itemActions from "./itemListActions";
import { ItemService } from "../../../service/ItemService";
import newItemActions from "../../../component/addItem/action/newItemActions";
import store from "../../../store";
import { getItemList } from "../selectors";

export const setItemList = (itemList) => ({
    type: itemActions.setItemList,
    itemList
});
export const setNextItemId = (nextItemId) => ({
    type: itemActions.setNextItemId,
    nextItemId
});

export const setNextItemValue = (nextItemValue) => ({
    type: itemActions.setNextItemValue,
    nextItemValue
});
export const setCategoryId = (categoryId) => ({
    type: itemActions.setCategoryId,
    categoryId
});
export const setColorId = (colorId) => ({
    type: itemActions.setColorId,
    colorId
});

export const setSizeId = (sizeId) => ({
    type: itemActions.setSizeId,
    sizeId
});

export const setBrandId = (brandId) => ({
    type: itemActions.setBrandId,
    brandId
});

export const resetData = () => (dispatch) => {
    dispatch({
        type: newItemActions.resetData,
    });
};

export const fetchItems = () => (dispatch) => {
    const data = getItemList(store.getState());
    const filterObject = {
        nextItemId: data.nextItemId,
        sizeId: data.filters.sizeId,
        colorId: data.filters.colorId,
        categoryId: data.filters.categoryId,
        brandId: data.filters.brandId,
        sortingColumn: data.sorting.sortingColumn,
        sortingOrder: data.sorting.sortingOrder,
        nextItemValue: data.nextItemValue,
        pageSize: 10
    };

    if (data.nextItemId !== null || data.itemList.length === 0) {
        setTimeout(() => {
            ItemService.getItems(filterObject).then((response) => response.json()).then((json) => {
                dispatch(setItemList(json.itemList));
                dispatch(setNextItemId(json.nextItemId));
                dispatch(setNextItemValue(json.nextItemValue));
            });
        }, 4000);
    }
    return true;
};
