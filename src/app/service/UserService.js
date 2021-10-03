const UserService = {

    register: async (registerCredentials) => {
        console.log(registerCredentials);
        return fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerCredentials),
        });
    },
};

export default UserService;
