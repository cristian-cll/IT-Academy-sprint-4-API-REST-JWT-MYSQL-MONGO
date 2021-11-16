const InMongoDatabaseServices = require('../persistance/mongo/InMongoDatabaseServices');
const InMySQLDatabaseServices = require('../persistance/MySQL/InMySQLDatabaseServices');

const checkDatabaseEnv = () => {
    const { DB_ENV } = process.env;

    if(DB_ENV === undefined ) return new InMongoDatabaseServices(); // By default with npm start, start with mongo
    
    let databaseService;
    
    switch (DB_ENV.trim()) {
        case "MYSQL": databaseService = new InMySQLDatabaseServices(); break; // npm run mysql
        case "MONGO": databaseService = new InMongoDatabaseServices(); break; // npm run mongo
        default: databaseService = new InMongoDatabaseServices(); break;
    }

    return databaseService;

}

module.exports = checkDatabaseEnv;