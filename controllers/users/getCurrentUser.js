const getCurrentUser = async (req, resp) => resp.status(200).json({
	email: req.user.email,
	subscription: req.user.subscription
});

module.exports = getCurrentUser;