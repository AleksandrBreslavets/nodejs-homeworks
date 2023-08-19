const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseErr } = require("../helpers");

const subscrOptions = ["starter", "pro", "business"];

const authSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscrOptions,
        default: "starter"
    },
    token: {
        type: String,
        default: ''
    },
    avatarURL: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

const authJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const updSubscrJoiScema=Joi.object({
    subscription: Joi.string().valid(...subscrOptions).required()
});

const schemas = {
    authJoiSchema,
    updSubscrJoiScema
};

authSchema.post("save", handleMongooseErr);

const User = model("user", authSchema);

module.exports = {
    User,
    schemas
};