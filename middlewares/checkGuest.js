const router = require("express").Router();

router.get("/", async (req, res) => {
	if (!res.locals.isGuest) {
		return res.redirect("/dashboard");
	}
	res.render("signup", { title: "The Tech Blog" });
});

module.exports = router;