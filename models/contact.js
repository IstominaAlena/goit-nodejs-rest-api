const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [ true, "Set name for contact" ],
		},
		email: {
			type: String,
			required: [ true, "Set email for contact" ],
		},
		phone: {
			type: String,
			required: [ true, "Set phone for contact" ],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{ versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
	owner: Joi.string(),
});

const joiUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required,
});

const Contact = model("contact", contactSchema);

module.exports = {
	Contact,
	schemas: { joiContactSchema, joiUpdateFavoriteSchema },
};
