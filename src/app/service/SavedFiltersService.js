// eslint-disable-next-line no-unused-vars
import { authHeader, handleResponse } from "./helper";

function saveFilters(filters) {
    return fetch("http://localhost:8080/filters", {
        method: "POST",
        body: JSON.stringify(filters),
        headers: authHeader(),
    }).then(handleResponse);
}

function getSavedFilters() {
    return fetch("http://localhost:8080/filters/list", {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getSavedFilterById(id) {
    return fetch(`http://localhost:8080/filters?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function deleteSavedFilterById(id) {
    return fetch(`http://localhost:8080/filters?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const SavedFiltersService = {
    saveFilters,
    getSavedFilters,
    getSavedFilterById,
    deleteSavedFilterById
};
