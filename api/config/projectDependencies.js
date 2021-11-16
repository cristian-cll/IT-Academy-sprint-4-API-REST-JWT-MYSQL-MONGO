const JWTAccessToken = require("../../src/shared/infrastructure/security/JWTAccessToken");
const checkDatabaseEnv = require("../../src/shared/infrastructure/contracts/DatabaseServices");


module.exports = (() => {
    return {
        DatabaseService: checkDatabaseEnv(),
        Authentication: new JWTAccessToken()

    };
})();
