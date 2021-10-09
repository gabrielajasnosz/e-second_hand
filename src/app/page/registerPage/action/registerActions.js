const prefix = "REGISTER_PAGE_DATA";

const registerActions = {
    setPassword: `${prefix}_SET_PASSWORD`,
    setEmail: `${prefix}_SET_EMAIL`,
    setDisplayName: `${prefix}_SET_DISPLAY_NAME`,
    setRegistrationStatus: `${prefix}_SET_REGISTRATION_STATUS`,
    setEmailIncorrect: `${prefix}_SET_EMAIL_INCORRECT`,
    setRegistrationMessage: `${prefix}_SET_REGISTRATION_MESSAGE`,
    registerUser: `${prefix}_REGISTER_USER`,
    resetData: `${prefix}_RESET_DATA`,
};

export default registerActions;
