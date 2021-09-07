const { DataTypes } = require("sequelize");
const sequelize = require("../../shared/infrastructure/persistance/MySQL/Sequelize");
const Game = sequelize.define(
	"Game",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		
		diceOne: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		diceTwo: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		result: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		won: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "game",
		timestamps: false
	}
);

module.exports = Game;