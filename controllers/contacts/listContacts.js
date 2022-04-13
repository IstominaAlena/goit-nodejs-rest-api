const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
	const { _id } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;
	const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", { skip, limit: +limit }).populate("owner", "email subscription");
	res.status(200).json(result);
};

module.exports = listContacts;
