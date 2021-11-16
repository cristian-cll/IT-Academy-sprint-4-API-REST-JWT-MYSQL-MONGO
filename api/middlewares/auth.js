// Use cases
const VerifyAccessToken = require("../../src/shared/application/security/VerifyAccessToken");

module.exports = (dependencies) => {

    // Dependencies
    const { Authentication } = dependencies;

    // Injecting dependencies
    const verifyCommand = VerifyAccessToken(Authentication);

    // Global authorization
    const auth = async (req, res, next) => {

        // Extract authorization header and token
        const header = req.headers.authorization;
        if (!header) return res.status(403).json("Access denied.");

        const token = header.split(" ")[1];

        // Call use case
        try {
            await verifyCommand(token);
            next();
        } catch (error) {
            next(error);
        }

    }
    
    // Individual authorization for user
    const authSingle = async (req, res, next) => {

        // Extract authorization header, token and playerId
        const { playerId } = req.params;
        const header = req.headers.authorization;

        if (!header) return res.status(403).json("Access denied.");

        const token = header.split(" ")[1];

        // Call use case
        try {
            const playerDecoded = await verifyCommand(token);
            if (playerDecoded._id != playerId) return res.status(403).json("This token is not valid for this ID.");
            next();
        } catch (error) {
            next(error);
        }

    }

    return {
        auth,
        authSingle
    };
};