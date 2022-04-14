const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middleware");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express();

router.patch(
	"/:id",
	validation(schemas.joiUpdateSubscriptionSchema),
	ctrlWrapper(ctrl.updateSubscription)
);

router.post(
	"/signup",
	validation(schemas.joiSignUpUserSchema),
	ctrlWrapper(ctrl.signUpUser)
);

router.post(
	"/signin",
	validation(schemas.joiSignUpUserSchema),
	ctrlWrapper(ctrl.signInUser)
);

router.get(
	"/current",
	auth,
	ctrlWrapper(ctrl.getCurrentUser)
);

router.get(
	"/logout",
	auth,
	ctrlWrapper(ctrl.logoutUser)
);

module.exports = router;