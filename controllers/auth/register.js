const bcrypt = require("bcrypt");
const { userModel: { User } } = require("../../models");
const { HttpError } = require("../../helpers");

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) throw HttpError(409, "Email in use.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.json({
        user: {
            email: newUser.email,
            subscripton: newUser.subscription
        }
    });
};

module.exports = registerUser;