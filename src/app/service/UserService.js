import { BehaviorSubject } from "rxjs";
import { decodeToken, isExpired } from "react-jwt";

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

function validateToken(token) {
    return token && !isExpired(token);
}

export const UserService = {
    login,
    logout,
    register,
    validateToken,
    confirmRegistration,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value; },
    get decodedTokenValue() {
        if (currentUserSubject.value) {
            return decodeToken(currentUserSubject.value);
        }
        return null;
    },
};

export function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
