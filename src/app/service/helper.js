import { UserService } from "./UserService";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = UserService.currentUserValue;
    if (currentUser) {
        console.log(currentUser);
        return { Authorization: `Bearer ${currentUser}` };
    }
    return {};
}

export function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                UserService.logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
