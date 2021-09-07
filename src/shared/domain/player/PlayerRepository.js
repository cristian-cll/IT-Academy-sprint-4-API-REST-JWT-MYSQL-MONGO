module.exports = class PlayerRepository {
    constructor() { }

    add(playerInstance) {
        return Promise.reject(new Error('not implemented'));
    }

    update(PlayerId, property) {
        return Promise.reject(new Error('not implemented'));
    }

    getById(PlayerId) {
        return Promise.reject(new Error('not implemented'));
    }

    getByUsername(playerUsername) {
        return Promise.reject(new Error('not implemented'));
    }

    getAll() {
        return Promise.reject(new Error('not implemented'));
    }

};
