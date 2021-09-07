const express = require('express');
const RankingController = require('../controllers/RankingController');

const AuthMiddleware = require("../middlewares/auth");

const rankingRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const rankingController = RankingController(dependencies);

    // load middleware with dependencies
    const authMiddleware = AuthMiddleware(dependencies);


    router.route('/ranking')
        .get(authMiddleware.auth, rankingController.getRanking)
    router.route('/ranking/winner')
        .get(authMiddleware.auth, rankingController.getWinner)
    router.route('/ranking/looser')
        .get(authMiddleware.auth, rankingController.getLooser)
   
    return router;
};


module.exports = rankingRouter;
