function getCategories() {
    return fetch("http://localhost:8080/categories/");
}

// eslint-disable-next-line import/prefer-default-export
export const CategoryService = {
    getCategories,
};
