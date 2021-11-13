// eslint-disable-next-line no-unused-vars
import { authHeader, handleResponse } from "./helper";
import { UserService } from "./UserService";

function saveItem(newItem) {
    return fetch("http://localhost:8080/item/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${UserService.currentUserValue}`
        },
        body: newItem
    }).then(handleResponse);
}

function editItem(editedItem) {
    return fetch("http://localhost:8080/item/edit", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(editedItem)
    }).then(handleResponse);
}

function getItem(itemId) {
    return fetch(`http://localhost:8080/item/item?itemId=${encodeURIComponent(itemId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function deleteItem(itemId) {
    return fetch(`http://localhost:8080/item/delete?itemId=${encodeURIComponent(itemId)}`, {
        method: "DELETE",
        headers: authHeader(),
    }).then(handleResponse);
}

function getItems(filters) {
    return fetch("http://localhost:8080/item/list", {
        method: "POST",
        body: JSON.stringify(filters),
        headers: authHeader(),
    }).then(handleResponse);
}

function getPriceExtremeValues() {
    return fetch("http://localhost:8080/item/price/extremeValues", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function manageItemVisibility(itemId, status) {
    return fetch(`http://localhost:8080/item/itemVisibility?itemId=${encodeURIComponent(itemId)}&status=${encodeURIComponent(status)}`, {
        method: "PUT",
        headers: authHeader(),
    }).then(handleResponse);
}
// eslint-disable-next-line import/prefer-default-export
export const ItemService = {
    saveItem,
    getItem,
    editItem,
    deleteItem,
    getItems,
    getPriceExtremeValues,
    manageItemVisibility
};
