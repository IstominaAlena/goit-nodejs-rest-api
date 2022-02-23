const createError = require("http-errors");

const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw createError(400, "missing field favorite");
  }

  res.status(200).json(result);
};

module.exports = updateContact;
