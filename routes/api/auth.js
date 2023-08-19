const express = require('express');

const router = express.Router();

const { authCtrl: ctrl } = require("../../controllers");
const { validationBody, authenticate, upload } = require("../../middlewars");
const { userModel:{schemas} } = require("../../models");   

router.post('/register', validationBody(schemas.authJoiSchema, "An error with Joi or another library validation."), ctrl.registerUser);
router.post('/login', validationBody(schemas.authJoiSchema, "An error with Joi or another library validation."), ctrl.loginUser);
router.get('/current', authenticate, ctrl.currentUser);
router.post('/logout', authenticate, ctrl.logoutUser);
router.patch('/', authenticate, validationBody(schemas.updSubscrJoiScema, "Missing field subscription"), ctrl.updSubscr);
router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updAvatar);

module.exports = router;