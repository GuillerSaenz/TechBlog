const router = require("express").Router();

const {withAuth} = require("../auth");
const {Post, User, Comment} = require("../models");
const {formatDate} = require("../utils/formatDate");

router.get("/", async (req, res) => {
	const posts = await Post.findAll({
		include: [User],
	});
	const formattedPosts = posts.map((post) => ({
		id: post.dataValues.id,
		title: post.dataValues.title,
		content: post.dataValues.content,
		username: post.dataValues.User.dataValues.username,
		createdAt: formatDate(post.dataValues.createdAt),
	}));
	res.render("homepage", { title: "The Tech Blog", posts: formattedPosts });
});

router.get("/post/:id", async (req, res) => {
	const post = await Post.findByPk(req.params.id, {
		include: [
			User,
			{
				model: Comment,
				include: [User],
			},
		],
	});
	const formattedPost = {
		id: post.dataValues.id,
		title: post.dataValues.title,
		content: post.dataValues.content,
		username: post.dataValues.User.dataValues.username,
		createdAt: formatDate(post.dataValues.createdAt),
		comments: post.dataValues.Comments.map((comment) => ({
			id: comment.id,
			content: comment.content,
			createdAt: formatDate(comment.createdAt),
			username: comment.User.dataValues.username,
		})),
	};
	res.render("post", { title: "The Tech Blog", post: formattedPost });
});

router.post("/post/:id/comment", withAuth, async (req, res) => {
	await Comment.create({
		...req.body,
		userId: req.session.userId,
		postId: req.params.id,
	});
	res.redirect(`/post/${req.params.id}`);
});

module.exports = router;