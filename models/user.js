const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionArr = [ "starter", "pro", "business" ];

const userSchema = Schema({
	email: {
		type: String,
		required: [ true, 'Email is required' ],
		unique: true,
		match: emailRegexp,
	},
	password: {
		type: String,
		required: [ true, 'Password is required' ],
		minlength: 6,
	},
	subscription: {
		type: String,
		enum: subscriptionArr,
		default: "starter"
	},
	token: {
		type: String,
		default: null,
	},
	avatarUrl: {
		type: String,
		default: "",
	},
	verify: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		required: [ true, 'Verify token is required' ],
	},
},
	{ versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const joiSignUpUserSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid(...subscriptionArr),
	token: Joi.string(),
	avatarUrl: Joi.string(),
	verify: Joi.boolean(),
	verificationToken: Joi.string().required(),
});

const joiUpdateSubscriptionSchema = Joi.object({
	subscription: Joi.string().valid(...subscriptionArr).required(),
});

const joiUpdateAvatarSchema = Joi.object({
	avatarUrl: Joi.string().required(),
});

const joiUpdateVerificationUserSchema = Joi.object({
	verify: Joi.boolean().required(),
	verificationToken: Joi.string().required(),
});

const joiVerifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
	User,
	schemas: {
		joiSignUpUserSchema,
		joiUpdateSubscriptionSchema,
		joiUpdateAvatarSchema,
		joiUpdateVerificationUserSchema,
		joiVerifyEmailSchema
	}
};