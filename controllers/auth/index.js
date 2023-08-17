const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./register");
const loginUser = require("./login");
const currentUser = require("./current");
const logoutUser = require("./logout");
const updSubscr = require("./updSubscr");

module.exports = {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
    currentUser: ctrlWrapper(currentUser),
    logoutUser: ctrlWrapper(logoutUser),
    updSubscr:ctrlWrapper(updSubscr)
};