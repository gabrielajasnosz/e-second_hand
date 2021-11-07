import { UserService } from "./UserService";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = UserService.currentUserValue;
    if (currentUser) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${UserService.currentUserValue}`
        };
    }
    return {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
}

export function handleResponse(response) {
    if (response.status === 401) {
        UserService.logout();
        window.location.href = ("/");
        // eslint-disable-next-line no-throw-literal
        throw "error";
    }
    if (response.status === 404) {
        window.location.href = ("/not-found");
        // eslint-disable-next-line no-throw-literal
        throw "error";
    }
    return response;
}
