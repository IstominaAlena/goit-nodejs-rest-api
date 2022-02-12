const createError = require("http-errors");

const contacts = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json(result);
};

module.exports = getContactById;
