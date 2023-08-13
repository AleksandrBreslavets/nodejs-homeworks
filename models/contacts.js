const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseErr } = require("../middlewars");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const validationJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean()
});

const favoriteUpdValidationSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const schemas = {
    validationJoiSchema,
    favoriteUpdValidationSchema
};

contactSchema.post("save", handleMongooseErr);

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};