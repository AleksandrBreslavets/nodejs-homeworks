const express = require('express');

const router = express.Router();

const { authCtrl: ctrl } = require("../../controllers");
const { validationBody} = require("../../middlewars");
const { userModel:{schemas} } = require("../../models");   

router.post('/register', validationBody(schemas.authJoiSchema, "An error with Joi or another library validation."), ctrl.registerUser);
router.post('/login', validationBody(schemas.authJoiSchema, "An error with Joi or another library validation."), ctrl.loginUser);

module.exports = router;