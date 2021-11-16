const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../../shared/infrastructure/persistance/MySQL/Sequelize")
const Player = sequelize.define(
	"Player",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			defaultValue: "Anonymous",
		},
        
	},
    	{
		sequelize,
		modelName: "player",
		timestamps: false
	}
);

module.exports = Player;