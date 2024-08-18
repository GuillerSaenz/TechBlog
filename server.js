const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/config");
const apiRoutes = require("./controllers/apiRoutes");
const homeRoutes = require("./controllers/homeRoutes");
const loginRoute = require("./controllers/loginRoute");
const signupRoute = require("./controllers/signupRoute");
const {checkGuest} = require("./middlewares/checkGuest");
const dashboardRoutes = require("./controllers/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Initiate Sequalize for Expiration
const sessionStore = new SequelizeStore({
	db: sequelize,
	checkExpirationInterval: 15 * 60 * 1000,
	expiration: 15 * 60 * 1000,
});

//Session Configuration
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 15 * 60 * 1000,
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: false,
	rolling: true,
	store: sessionStore,
};

//Handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session(sess));
app.use(checkGuest);

// Routes
app.use("/", homeRoutes);
app.use("/api", apiRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Oops, something went wrong");
});

// Start Server
sequelize.sync().then(() => {
	sessionStore.sync();
	app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});