import { authHeader, handleResponse } from "./helper";

function getCategories() {
    return fetch("http://localhost:8080/categories");
}

function getBrands() {
    return fetch("http://localhost:8080/brands");
}

function getSizes() {
    return fetch("http://localhost:8080/sizes");
}

function getSizesUngrouped() {
    return fetch("http://localhost:8080/sizes/ungrouped");
}

function getColors() {
    return fetch("http://localhost:8080/colors");
}

function saveCategory(newCategory) {
    return fetch("http://localhost:8080/categories/new", {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const CategoryService = {
    getCategories,
    getBrands,
    getSizes,
    getColors,
    getSizesUngrouped,
    saveCategory
};
