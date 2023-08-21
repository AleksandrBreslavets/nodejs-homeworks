const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./register");
const loginUser = require("./login");
const currentUser = require("./current");
const logoutUser = require("./logout");
const updSubscr = require("./updSubscr");
const updAvatar = require("./updAvatar");
const verifyUser = require("./verifyUser");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
    currentUser: ctrlWrapper(currentUser),
    logoutUser: ctrlWrapper(logoutUser),
    updSubscr: ctrlWrapper(updSubscr),
    updAvatar: ctrlWrapper(updAvatar),
    verifyUser: ctrlWrapper(verifyUser),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
};