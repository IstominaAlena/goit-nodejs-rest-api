const createError = require("http-errors");

const { User } = require("../../models/user");
const { sendMail } = require("../../utils/sendMail");

const reverifyUser = async (req, resp) => {
	const { email } = req.body;

	const user = await User.findOne(email);
	if (user.verify) {
		throw createError(400, "Verification has already been passed");
	};

	const mail = {
		to: email,
		subject: "Password confirming",
		html: `<a href="http://localhost:3000/api/users/${user.verificationToken}" target="_blank"> 
		Click here to confirm your email
		</a>`
	};

	await sendMail(mail);

	resp.status(201).json({
		message: "Verification email sent"
	});
};

module.exports = reverifyUser;