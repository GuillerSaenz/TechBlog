const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Comment",
	}
);

module.exports = Comment;