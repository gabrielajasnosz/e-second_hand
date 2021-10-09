import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));

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
            localStorage.setItem("currentUser", JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
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

export const UserService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.token; }
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
