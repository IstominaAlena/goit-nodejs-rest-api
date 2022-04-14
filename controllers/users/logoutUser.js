const { User } = require("../../models/user");

const logoutUser = async (req, resp) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: null });
	return resp.status(204).send();
};

module.exports = logoutUser;