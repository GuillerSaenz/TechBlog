const router = require("express").Router();

// GET Login page
router.get("/", async (req, res) => {
	if (!res.locals.isGuest) {
		return res.redirect("/dashboard");
	}
	res.render("login", { title: "The Tech Blog" });
});

module.exports = router;