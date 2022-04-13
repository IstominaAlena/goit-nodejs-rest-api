const createError = require("http-errors");

const { User } = require("../../models/user");

const updateSubscription = async (req, resp) => {
	const { id } = req.params;
	const result = await User.findByIdAndUpdate(id, req.body, { new: true });

	if (!result) {
		throw createError(400, "missing fields");
	};

	resp.status(200).json(result);
};

module.exports = updateSubscription;