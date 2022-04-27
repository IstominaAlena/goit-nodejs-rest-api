const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { MY_KEY } = process.env;
const { User, schemas } = require("../../models/user");

const signInUser = async (req, resp) => {
	const { error } = schemas.joiSignUpUserSchema.validate(req.body);

	if (error) {
		throw createError(400, error.message);
	};

	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw createError(401, "Email or password is wrong");
	};
	if (!user.verify) {
		throw createError(401, "Email not verified");
	};

	const compareResult = await bcrypt.compare(password, user.password);

	if (!compareResult) {
		throw createError(401, "Email or password is wrong");
	};

	const payload = {
		id: user._id
	};
	const token = jwt.sign(payload, MY_KEY, { expiresIn: "20h" });
	await User.findByIdAndUpdate(user._id, { token });
	resp.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription
		}
	});
};

module.exports = signInUser;