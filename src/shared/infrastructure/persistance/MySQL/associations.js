const Player = require("../../../../players/infrastructure/MysqlPlayerSchema");
const Game = require("../../../../games/infrastructure/MysqlGameSchema");


Player.hasMany(Game, { as: "games", foreignKey: "playerId" });
Game.belongsTo(Player, { as: "player" });