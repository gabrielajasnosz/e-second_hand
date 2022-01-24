import itemActions from "./itemListActions";
import { ItemService } from "../../../service/ItemService";
import { SavedFiltersService } from "../../../service/SavedFiltersService";
import store from "../../../store";
import { getItemList } from "../selectors";

export const setItemList = (itemList) => ({
    type: itemActions.setItemList,
    itemList
});

export const setSavedFilters = (savedFilters) => ({
    type: itemActions.setSavedFilters,
    savedFilters
});

export const setNextItemId = (nextItemId) => ({
    type: itemActions.setNextItemId,
    nextItemId
});

export const setNextItemValue = (nextItemValue) => ({
    type: itemActions.setNextItemValue,
    nextItemValue
});

export const setFilters = (filter) => ({
    type: itemActions.setFilters,
    filter
});

export const resetList = () => ({
    type: itemActions.resetList
});

export const setFiltersLoading = (filtersLoading) => ({
    type: itemActions.setFiltersLoading,
    filtersLoading
});

export const setLoading = (isLoading) => ({
    type: itemActions.setLoading,
    isLoading
});

export const setCategoryName = (categoryName) => ({
    type: itemActions.setCategoryName,
    categoryName
});

export const setBrandName = (brandName) => ({
    type: itemActions.setBrandName,
    brandName
});

export const setSizeName = (sizeName) => ({
    type: itemActions.setSizeName,
    sizeName
});
export const setColorName = (colorName) => ({
    type: itemActions.setColorName,
    colorName
});

export const fetchItems = () => (dispatch) => {
    const data = getItemList(store.getState());
    const filterObject = {
        nextItemId: data.nextItemId,
        sizeId: data.sizeId,
        colorId: data.colorId,
        categoryId: data.categoryId,
        brandId: data.brandId,
        sortingColumn: data.filters.sortingColumn,
        sortingOrder: data.filters.sortingOrder,
        nextItemValue: data.nextItemValue,
        maxPrice: data.filters.maxPrice,
        minPrice: data.filters.minPrice,
        onlyFollowedUsers: data.filters.onlyFollowedUsers,
        gender: data.gender,
        pageSize: 10
    };

    if (data.nextItemId !== null || data.itemList.length === 0) {
        dispatch(setLoading(true));
        ItemService.getItems(filterObject).then((response) => response.json()).then((json) => {
            setTimeout(() => {
                dispatch(setItemList(json.itemList));
                dispatch(setNextItemId(json.nextItemId));
                dispatch(setNextItemValue(json.nextItemValue));
                dispatch(setLoading(false));
            }, 1000);
        });
    }
    return true;
};

export const setCategoryId = (element) => (dispatch) => {
    const { name, id } = element;
    const data = getItemList(store.getState());
    dispatch({
        type: itemActions.setCategoryId,
        categoryId: id
    });
    dispatch({
        type: itemActions.setCategoryName,
        categoryName: name
    });

    if (data.itemList.length > 0 || id === null) {
        dispatch({
            type: itemActions.setNextItemId,
            nextItemId: null
        });
        dispatch({
            type: itemActions.resetList
        });
        dispatch(fetchItems());
    }
};

export const setColorId = (element) => (dispatch) => {
    const colorId = element.id;
    const colorName = element.name;
    dispatch({
        type: itemActions.setColorId,
        colorId
    });
    dispatch({
        type: itemActions.setColorName,
        colorName
    });
    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};

export const setSortingColumn = (element) => (dispatch) => {
    const sortingColumn = element.id;
    dispatch({
        type: itemActions.setSortingColumn,
        sortingColumn
    });
    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};

export const setSortingOrder = (element) => (dispatch) => {
    const sortingOrder = element.id;
    dispatch({
        type: itemActions.setSortingOrder,
        sortingOrder
    });
    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};

export const setBrandId = (brand) => (dispatch) => {
    dispatch({
        type: itemActions.setBrandId,
        brandId: brand.value
    });
    dispatch({
        type: itemActions.setBrandName,
        brandName: brand.label
    });

    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};

export const setSizeId = (element) => (dispatch) => {
    const sizeName = element.name;
    const sizeId = element.id;
    dispatch({
        type: itemActions.setSizeId,
        sizeId
    });
    dispatch({
        type: itemActions.setSizeName,
        sizeName
    });
    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};

export const setGender = (gender) => ({
    type: itemActions.setGender,
    gender
});

export const setMinPrice = (minPrice) => (dispatch) => {
    dispatch({
        type: itemActions.setMinPrice,
        minPrice
    });
    dispatch({
        type: itemActions.setNextItemId,
        nextItemId: null
    });
    dispatch({
        type: itemActions.resetList
    });
    dispatch(fetchItems());
};
export const setMaxPrice = (maxPrice) => ({
    type: itemActions.setMaxPrice,
    maxPrice
});

export const resetData = () => (dispatch) => {
    dispatch({
        type: itemActions.resetItemList,
    });
};

export const fetchSavedFilters = () => (dispatch) => {
    SavedFiltersService.getSavedFilters().then((response) => response.json()).then((json) => {
        dispatch(setSavedFilters(json));
    });
};

export const fetchFiltersById = (id) => (dispatch) => {
    SavedFiltersService.getSavedFilterById(id).then((response) => response.json()).then((json) => {
        dispatch(setFilters(json));
        dispatch({
            type: itemActions.setNextItemId,
            nextItemId: null
        });
        dispatch({
            type: itemActions.resetList
        });
        dispatch(fetchItems());
    });

    return true;
};

export const saveFilters = (name) => (dispatch) => {
    const data = getItemList(store.getState());
    const filterObject = {
        sizeId: data.sizeId,
        colorId: data.colorId,
        categoryId: data.categoryId,
        brandId: data.brandId,
        sortingColumn: data.filters.sortingColumn,
        sortingOrder: data.filters.sortingOrder,
        maxPrice: data.filters.maxPrice,
        minPrice: data.filters.minPrice,
        name,
        gender: data.gender
    };
    dispatch(setFiltersLoading(true));
    SavedFiltersService.saveFilters(filterObject).then((response) => response.json()).then(() => {
        setTimeout(() => {
            dispatch(fetchSavedFilters());
            dispatch(setFiltersLoading(false));
        }, 1000);
    });

    return true;
};

export const setOnlyFollowedUsers = (onlyFollowedUsers) => (dispatch) => {
    dispatch({
        type: itemActions.setOnlyFollowedUsers,
        onlyFollowedUsers
    });
    if (onlyFollowedUsers === false) {
        dispatch({
            type: itemActions.resetList
        });
        dispatch(fetchItems());
    }
};
