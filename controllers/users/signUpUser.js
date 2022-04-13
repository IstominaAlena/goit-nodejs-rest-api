const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const signUpUser = async (req, resp) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		throw createError(409, "Email in use");
	};

	const hashPassword = await bcrypt.hash(password, 10);

	await User.create({ email, password: hashPassword });
	resp.status(201).json({
		user: {
			email,
			subscription: "starter"
		}
	});
};

module.exports = signUpUser;