const bcrypt = require("bcrypt");
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/config");

class User extends Model {}

User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "User",
		hooks: {
			beforeCreate: async (user) => {
				user.password = await bcrypt.hash(user.password, 10);
			},
		},
	}
);

module.exports = User;