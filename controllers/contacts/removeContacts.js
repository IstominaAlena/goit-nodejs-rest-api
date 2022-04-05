const createError = require("http-errors");

const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw createError(404, "Not Found");
  }

  res.status(200).json({
    "message": "Product deleted",
  });
};

module.exports = removeContact;
