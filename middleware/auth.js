const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { MY_KEY } = process.env;
const { User } = require("../models/user");

const auth = async (req, _, next) => {
	try {
		const { authorization = "" } = req.headers;
		const [ bearer, token ] = authorization.split(' ');

		if (bearer !== "Bearer") {
			throw createError(401, "Not authorized");
		};

		const { id } = jwt.verify(token, MY_KEY);
		const user = await User.findById(id);

		if (!user || !user.token) {
			throw createError(401, "Not authorized");
		};

		req.user = user;
		next();
	} catch (error) {
		if (!error.status) {
			error.status = 401;
			error.message = "Not authorized";
		};
		next(error);
	};
};

module.exports = auth;