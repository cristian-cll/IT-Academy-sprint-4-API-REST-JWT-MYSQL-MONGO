module.exports = class Player {
    constructor(username, id, successRate) {
        this.id = id;
        this.username = username;
        this.successRate = successRate || 0 ;
    }
};