function getCategories() {
    return fetch("http://localhost:8080/categories/");
}

function getBrands() {
    return fetch("http://localhost:8080/categories/brands");
}

function getSizes() {
    return fetch("http://localhost:8080/categories/sizes");
}

// eslint-disable-next-line import/prefer-default-export
export const CategoryService = {
    getCategories,
    getBrands,
    getSizes
};
