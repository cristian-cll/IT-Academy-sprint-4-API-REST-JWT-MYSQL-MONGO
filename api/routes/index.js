const express = require('express');
const players = require('./players');
const games = require('./games');
const ranking = require('./ranking');


const apiRouter = (dependencies) => {
    const routes = express.Router();

    const playersRouter = players(dependencies);
    const gamesRouter = games(dependencies);
    const rankingRouter = ranking(dependencies);

    routes.use(rankingRouter);
    routes.use(playersRouter);
    routes.use(gamesRouter);
    
    

    return routes;

};


module.exports = apiRouter;
