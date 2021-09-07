const GetRanking = require("../../src/shared/application/ranking/GetRanking");
const GetWinner = require("../../src/shared/application/ranking/GetWinner");
const GetLooser = require("../../src/shared/application/ranking/GetLooser");

module.exports = (dependencies) => {

    // Dependencies
    const { rankingRepository } = dependencies.DatabaseService;

    // Injecting dependencies
    const GetRankingCommand = GetRanking(rankingRepository);
    const GetWinnerCommand = GetWinner(rankingRepository);
    const GetLooserCommand = GetLooser(rankingRepository);

    const getRanking = async (req, res, next) => {

        // Call use case
        try {
            
            const ranking = await GetRankingCommand()
            res.status(200);
            res.json(ranking);
        } catch (error) {
            next(error);
        }

    };

    const getWinner = async (req, res, next) => {

        // Call use case
        try {

            const winner = await GetWinnerCommand()
            res.status(200);
            res.json(winner);
        } catch (error) {
            next(error);
        }

    };

    const getLooser = async (req, res, next) => {

        // Call use case
        try {

            const looser = await GetLooserCommand()
            res.status(200);
            res.json(looser);
        } catch (error) {
            next(error);
        }

    };
 
    return {
        getRanking,
        getWinner,
        getLooser
    };
 
  
};
