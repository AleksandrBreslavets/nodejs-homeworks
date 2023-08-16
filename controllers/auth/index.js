const { ctrlWrapper } = require("../../helpers");
const registerUser = require("./register");
const loginUser = require("./login");

module.exports = {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
}