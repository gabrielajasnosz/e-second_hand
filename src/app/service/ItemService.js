// eslint-disable-next-line no-unused-vars
import { handleResponse } from "./helper";
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
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${UserService.currentUserValue}`
        },
        body: JSON.stringify(editedItem)
    }).then(handleResponse);
}

function getItem(itemId) {
    return fetch(`http://localhost:8080/item/item?itemId=${encodeURIComponent(itemId)}`);
}
// eslint-disable-next-line import/prefer-default-export
export const ItemService = {
    saveItem,
    getItem,
    editItem
};
