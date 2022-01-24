// eslint-disable-next-line no-unused-vars
import { authHeader, handleResponse } from "./helper";
import { UserService } from "./UserService";

function saveItem(newItem) {
    return fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${UserService.currentUserValue}`
        },
        body: newItem
    }).then(handleResponse);
}

function reportItem({ id, reportCause }) {
    return fetch("http://localhost:8080/items/report", {
        method: "POST",
        body: JSON.stringify({
            itemId: id,
            cause: reportCause
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${UserService.currentUserValue}`
        },
    }).then(handleResponse);
}

function editItem(editedItem) {
    return fetch("http://localhost:8080/items", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(editedItem)
    }).then(handleResponse);
}

function getItem(itemId) {
    return fetch(`http://localhost:8080/items/${encodeURIComponent(itemId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getHiddenItems() {
    return fetch("http://localhost:8080/items/hidden", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function deleteItem(itemId) {
    return fetch(`http://localhost:8080/items/${encodeURIComponent(itemId)}`, {
        method: "DELETE",
        headers: authHeader(),
    }).then(handleResponse);
}

function getUserCounters(userId) {
    return fetch(`http://localhost:8080/items/counters/${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getItems(filters) {
    return fetch("http://localhost:8080/items/list", {
        method: "POST",
        body: JSON.stringify(filters),
        headers: authHeader(),
    }).then(handleResponse);
}

function getPriceExtremeValues() {
    return fetch("http://localhost:8080/items/price/extreme-values", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function manageItemVisibility(itemId, status) {
    return fetch(`http://localhost:8080/items/item-visibility/${encodeURIComponent(itemId)}?status=${encodeURIComponent(status)}`, {
        method: "PUT",
        headers: authHeader(),
    }).then(handleResponse);
}

function getFollowedUsersItems(userId, page, pageSize) {
    // eslint-disable-next-line max-len
    return fetch(`http://localhost:8080/items/followed-users?user=${encodeURIComponent(userId)}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`, {
        method: "GET",
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
    getUserCounters,
    getHiddenItems,
    getPriceExtremeValues,
    manageItemVisibility,
    getFollowedUsersItems,
    reportItem
};
