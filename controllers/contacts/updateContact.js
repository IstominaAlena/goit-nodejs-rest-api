const createError = require("http-errors");

const contacts = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);

  if (!result) {
    throw createError(404, "Not Found");
  }

  res.json(result);
};

module.exports = updateContact;
