import pageActions from "./pageActions";

export const setLoggedInStatus = (isLoggedIn) => ({
    type: pageActions.setEmail,
    isLoggedIn
});
