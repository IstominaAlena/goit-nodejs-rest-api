const createError = require("http-errors");

const { User } = require("../../models/user");

const verifyUser = async (req, resp) => {
	const { verificationToken } = req.params;

	const user = await User.findOne(verificationToken);

	if (!user) {
		throw createError(404, "User not found");
	};
	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: ''
	});

	resp.status(201).json({
		message: "Verification successful"
	});
};

module.exports = verifyUser;