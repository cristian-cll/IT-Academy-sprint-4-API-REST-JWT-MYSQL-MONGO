// Use cases
const GetAccessToken = require("../../src/shared/application/security/GetAccessToken");

module.exports = (dependencies) => {

    // Dependencies
    const { playerRepository } = dependencies.DatabaseService;
    const { Authentication } = dependencies;

    // Injecting dependencies
    const LoginCommand = GetAccessToken(playerRepository, Authentication);


    const login = async (req, res, next) => {

        // Extract player username
        const { username, _id } = req.body

        // Call use case
        try {
            const token = await LoginCommand(username, _id);
            res.status(201);
            res.json(token);
        } catch (error) {
            next(error);
        }

    }


    return {
        login
    };
};