const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseErr } = require("../middlewars");

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
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: ''
    },
}, { versionKey: false, timestamps: true });

const authJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const schemas = {
    authJoiSchema
};

authSchema.post("save", handleMongooseErr);

const User = model("user", authSchema);

module.exports = {
    User,
    schemas
};