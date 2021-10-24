function getCategories() {
    return fetch("http://localhost:8080/categories/");
}

function getBrands() {
    return fetch("http://localhost:8080/categories/brands");
}

function getSizes() {
    return fetch("http://localhost:8080/categories/sizes");
}

function getColors() {
    return fetch("http://localhost:8080/colors/");
}

// eslint-disable-next-line import/prefer-default-export
export const CategoryService = {
    getCategories,
    getBrands,
    getSizes,
    getColors
};
