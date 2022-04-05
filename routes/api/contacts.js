const express = require("express");

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { ctrlWrapper, validation } = require("../../middleware");

const router = express();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(schemas.joiContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  validation(schemas.joiContactSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:id/favorite",
  validation(schemas.joiUpdateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
