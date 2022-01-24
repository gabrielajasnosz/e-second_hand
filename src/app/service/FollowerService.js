import { authHeader, handleResponse } from "./helper";

function addToFollowed(userId) {
    return fetch(`http://localhost:8080/followers/${encodeURIComponent(userId)}`, {
        method: "POST",
        headers: authHeader(),
    }).then(handleResponse);
}

function deleteFromFollowed(userId) {
    return fetch(`http://localhost:8080/followers/${encodeURIComponent(userId)}`, {
        method: "DELETE",
        headers: authHeader(),
    }).then(handleResponse);
}

function getFollowers(userId) {
    return fetch(`http://localhost:8080/followers/${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getFollowing(userId) {
    return fetch(`http://localhost:8080/followers/following/${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const FollowerService = {
    addToFollowed,
    deleteFromFollowed,
    getFollowers,
    getFollowing
};
