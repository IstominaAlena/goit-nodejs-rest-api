const createError = require("http-errors");

const contacts = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);

  if (!result) {
    throw createError(404, "Not Found");
  }

  res.json({
    "message": "Product deleted",
  });
};

module.exports = removeContact;
