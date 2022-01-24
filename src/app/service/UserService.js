import { BehaviorSubject } from "rxjs";
import { decodeToken, isExpired } from "react-jwt";
// eslint-disable-next-line import/no-cycle
import { authHeader, handleResponse } from "./helper";

const currentUserSubject = new BehaviorSubject(localStorage.getItem("currentUser"));

function login(loginCredentials) {
    return fetch("http://localhost:8080/users/login", {
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
            const decodedToken = decodeToken(user.token);
            localStorage.setItem("role", decodedToken.role[0].authority);
            localStorage.setItem("currentUser", user.token);
            currentUserSubject.next(user);
            return user;
        });
}

function confirmRegistration(token) {
    return fetch(`http://localhost:8080/users/registration?token=${encodeURIComponent(token)}`);
}

function register(registerCredentials) {
    return fetch("http://localhost:8080/users/register", {
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
    localStorage.removeItem("role");
    currentUserSubject.next(null);
}

function findUsers(keyword) {
    return fetch(`http://localhost:8080/users/keyword?name=${encodeURIComponent(keyword)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function editProfile(userData) {
    return fetch("http://localhost:8080/users", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(userData),
    }).then(handleResponse);
}

function changePassword(passwordData) {
    return fetch("http://localhost:8080/users/password", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(passwordData),
    }).then(handleResponse);
}

function getUser(id) {
    return fetch(`http://localhost:8080/users?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: authHeader(),
    }).then(handleResponse);
}

function validateToken(token) {
    return token && !isExpired(token);
}

function setProfilePicture(newPictureForm) {
    return fetch("http://localhost:8080/users/profile-picture", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${currentUserSubject.value}`
        },
        body: newPictureForm
    }).then(handleResponse);
}

// eslint-disable-next-line import/prefer-default-export
export const UserService = {
    login,
    logout,
    register,
    validateToken,
    getUser,
    confirmRegistration,
    setProfilePicture,
    editProfile,
    findUsers,
    changePassword,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value; },
    get decodedTokenValue() {
        if (currentUserSubject.value) {
            return decodeToken(currentUserSubject.value);
        }
        return null;
    },
};
