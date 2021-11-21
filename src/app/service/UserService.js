import { BehaviorSubject } from "rxjs";
import { decodeToken, isExpired } from "react-jwt";
// eslint-disable-next-line import/no-cycle
import { authHeader, handleResponse } from "./helper";

const currentUserSubject = new BehaviorSubject(localStorage.getItem("currentUser"));

function login(loginCredentials) {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            // eslint-disable-next-line no-throw-literal
            throw "error";
        })
        .then((user) => {
            localStorage.setItem("currentUser", user.token);
            currentUserSubject.next(user);
            return user;
        });
}

function confirmRegistration(token) {
    return fetch(`http://localhost:8080/confirmRegistration?token=${encodeURIComponent(token)}`);
}

function register(registerCredentials) {
    return fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerCredentials),
    });
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUserSubject.next(null);
}

function findUsers(keyword) {
    return fetch(`http://localhost:8080/search-for-users?name=${encodeURIComponent(keyword)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function getUser(id) {
    return fetch(`http://localhost:8080/get-user?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function validateToken(token) {
    return token && !isExpired(token);
}

// eslint-disable-next-line import/prefer-default-export
export const UserService = {
    login,
    logout,
    register,
    validateToken,
    getUser,
    confirmRegistration,
    findUsers,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value; },
    get decodedTokenValue() {
        if (currentUserSubject.value) {
            return decodeToken(currentUserSubject.value);
        }
        return null;
    },
};
