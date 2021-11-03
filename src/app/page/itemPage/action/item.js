import itemActions from "./itemActions";

// eslint-disable-next-line import/prefer-default-export
export const setItem = (item) => ({
    type: itemActions.setItem,
    item
});

// export const login = () => (dispatch) => {
//     UserService.login(getLoginCredentials(store.getState()))
//         .then(() => {
//             window.location.href = "/";
//         })
//         .catch(() => {
//
//         });
// };
