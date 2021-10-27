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

// eslint-disable-next-line import/prefer-default-export
export const ItemService = {
    saveItem,
};
