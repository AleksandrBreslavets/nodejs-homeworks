const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel: { User } } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong.");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw HttpError(401, "Email or password is wrong.");
    if (!user.verify) throw HttpError(401, "Email is not verified.");
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });

};

module.exports = loginUser;