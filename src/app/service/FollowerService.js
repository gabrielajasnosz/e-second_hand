import { authHeader, handleResponse } from "./helper";

function addToFollowed(userId) {
    return fetch(`http://localhost:8080/followers/add?userId=${encodeURIComponent(userId)}`, {
        method: "POST",
        headers: authHeader(),
    }).then(handleResponse);
}

function deleteFromFollowed(userId) {
    return fetch(`http://localhost:8080/followers/delete?userId=${encodeURIComponent(userId)}`, {
        method: "DELETE",
        headers: authHeader(),
    }).then(handleResponse);
}

function getFollowers(userId) {
    return fetch(`http://localhost:8080/followers/get-followers?userId=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getFollowing(userId) {
    return fetch(`http://localhost:8080/followers/get-following?userId=${encodeURIComponent(userId)}`, {
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
