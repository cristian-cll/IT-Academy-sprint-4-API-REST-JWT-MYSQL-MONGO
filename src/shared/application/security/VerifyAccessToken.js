module.exports = accessToken => async (token) => {

    const tokenDecoded = accessToken.decode(token)
    if (!tokenDecoded) {
        throw new Error('Invalid access token')
    }

    return tokenDecoded;

};