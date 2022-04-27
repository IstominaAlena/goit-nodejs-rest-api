const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models/user");
const { sendMail } = require("../../utils/sendMail");

const signUpUser = async (req, resp) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		throw createError(409, "Email in use");
	};

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarUrl = gravatar.url(email);
	const verificationToken = v4();

	await User.create({ email, password: hashPassword, avatarUrl, verificationToken });

	const mail = {
		to: email,
		subject: "Password confirming",
		html: `<a href="http://localhost:3000/api/users/${verificationToken}" target="_blank"> 
		Click here to confirm your email
		</a>`
	};

	await sendMail(mail);

	resp.status(201).json({
		user: {
			email,
			subscription: "starter"
		}
	});
};

module.exports = signUpUser;