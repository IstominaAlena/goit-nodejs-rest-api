const express = require("express");

const ctrl = require("../../controllers/contacts");
const contactSchema = require("../../schemas/contacts");
const { ctrlWrapper, validation } = require("../../middleware");

const router = express();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validation(contactSchema), ctrlWrapper(ctrl.updateContact));

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
