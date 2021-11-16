const express = require('express');
const GameController = require('../controllers/GameController');

const AuthMiddleware = require("../middlewares/auth");

const gamesRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const gameController = GameController(dependencies);

    // load middleware with dependencies
    const authMiddleware = AuthMiddleware(dependencies);

    router.route('/:playerId/games')
        .post(authMiddleware.authSingle, gameController.newGame)
        .delete(authMiddleware.authSingle, gameController.deleteGames)
    return router;
};


module.exports = gamesRouter;
