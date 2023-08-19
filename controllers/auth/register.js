const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { userModel: { User } } = require("../../models");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashedPassword, avatarURL });
    res.json({
        user: {
            email: newUser.email,
            subscripton: newUser.subscription
        }
    });
};

module.exports = registerUser;