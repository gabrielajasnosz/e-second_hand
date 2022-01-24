import { authHeader, handleResponse } from "./helper";

function addComment(commentBody) {
    return fetch("http://localhost:8080/comments", {
        method: "POST",
        body: JSON.stringify(commentBody),
        headers: authHeader(),
    }).then(handleResponse);
}

function getComments(userId, page) {
    return fetch(`http://localhost:8080/comments/${encodeURIComponent(userId)}?page=${encodeURIComponent(page)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const CommentService = {
    addComment,
    getComments
};
