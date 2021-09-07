const AccessToken = require("../../domain/security/AccessToken");
const jwt = require("jsonwebtoken");

class JWTAccessToken extends AccessToken {
    generate(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    }

    decode(token) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }

}

module.exports = JWTAccessToken;