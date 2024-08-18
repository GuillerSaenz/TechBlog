const router = require("express").Router();

const { withAuth } = require("../auth");
const { Post, User } = require("../models");
const { formatDate } = require("../utils/formatDate");

// Get user's dashboard
router.get("/", withAuth, async (req, res) => {
	try {
		const user = await User.findByPk(req.session.userId, { include: [Post] });
		const posts = user.dataValues.Posts.map((post) => ({
			id: post.id,
			title: post.title,
			content: post.content,
			createdAt: formatDate(post.createdAt),
		}));
		res.render("dashboard", { title: "Your Dashboard", posts });
	} catch (error) {
		console.error("Error loading dashboard:", error);
		res.status(500).json({ error: "Failed to load dashboard" });
	}
});

// Render new post
router.get("/new", withAuth, (req, res) => {
	res.render("dashboard/new", { title: "Your Dashboard" });
});

// Render edit post
router.get("/edit/:id", withAuth, async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id);
		res.render("dashboard/edit", {
			title: "Your Dashboard",
			post: { id: post.dataValues.id, title: post.dataValues.title, content: post.dataValues.content },
		});
	} catch (error) {
		console.error("Error loading post for edit:", error);
		res.status(500).json({ error: "Failed to load post for edit" });
	}
});

// Create new post
router.post("/new", withAuth, async (req, res) => {
	try {
		await Post.create({ ...req.body, userId: req.session.userId });
		res.redirect("/dashboard");
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).json({ error: "Failed to create post" });
	}
});

// Edit post
router.post("/edit/:id", withAuth, async (req, res) => {
	try {
		await Post.update(req.body, { where: { id: req.params.id } });
		res.redirect("/dashboard");
	} catch (error) {
		console.error("Error editing post:", error);
		res.status(500).json({ error: "Failed to edit post" });
	}
});

// Delete post
router.delete("/delete/:id", withAuth, async (req, res) => {
	try {
		const result = await Post.destroy({ where: { id: req.params.id } });
		if (result === 0) {
			return res.status(404).json({ error: "Post not found" });
		}
		res.json({ message: "Post deleted successfully" });
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(500).json({ error: "Failed to delete post" });
	}
});

module.exports = router;