const express = require("express");

const { auth, validation, ctrlWrapper, upload } = require("../../middleware");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express();

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

router.patch(
	"/avatars",
	auth,
	// validation(schemas.joiUpdateAvatarSchema),
	upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar)
);

router.patch(
	"/:id",
	auth,
	validation(schemas.joiUpdateSubscriptionSchema),
	ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;