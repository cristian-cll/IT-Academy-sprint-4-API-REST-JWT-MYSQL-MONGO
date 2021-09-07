const express = require('express');
const PlayerController = require('../controllers/PlayerController');
const AuthController = require("../controllers/AuthController");

const AuthMiddleware = require("../middlewares/auth");

const playersRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const playerController = PlayerController(dependencies);
    const authController = AuthController(dependencies);


    // load middleware with dependencies
    const authMiddleware = AuthMiddleware(dependencies);


    router.route('/')
        .get(authMiddleware.auth, playerController.getAllPlayers)
        .post(playerController.addNewPlayer)
    router.route('/login')
        .post(authController.login)
    router.route('/:playerId')
        .get(authMiddleware.authSingle, playerController.getPlayer)
        .put(authMiddleware.authSingle, playerController.editPlayer)

    return router;
};


module.exports = playersRouter;
