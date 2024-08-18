const bcrypt = require("bcrypt");
const router = require("express").Router();

const {User} = require("../models");

// POST User login
router.post("/login", async (req, res) => {
	if (req.session.userId) return res.redirect("/");
	try {
		const user = await User.findOne({ where: { username: req.body.username } });
		if (user && (await bcrypt.compare(req.body.password, user.dataValues.password))) {
			req.session.save(() => {
				req.session.userId = user.id;
				res.redirect("/");
			});
		} else {
			res.status(400).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST User signup
router.post("/signup", async (req, res) => {
	if (req.session.userId) return res.redirect("/");

	try {
		const user = await User.create(req.body);
		req.session.save(() => {
			req.session.userId = user.id;
			res.redirect("/");
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// POST User logout
router.post("/logout", (req, res) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
});

module.exports = router;