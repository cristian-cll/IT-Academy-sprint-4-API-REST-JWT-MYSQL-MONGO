require('dotenv').config()

const express = require('express');
const routes = require('./routes');
const projectDependencies = require('./config/projectDependencies');
const ErrorHandler = require('../src/shared/infrastructure/common/ErrorHandler');
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

// Init database connection 

(async () => {
    
    try {
        await projectDependencies.DatabaseService.initDatabase();

        // load middlewares
        app.use(logger('dev'))
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // load routes
        app.use('/api/players', routes(projectDependencies));

        // generic error handler
        app.use(ErrorHandler);

        app.listen(port, () => console.log(`Server running on port ${port}`));

    } catch (error) {
        console.log(`Database is not ready, err:${error}`);
    }

})();