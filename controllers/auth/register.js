const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");
const { userModel: { User } } = require("../../models");
const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../services");

const { BASE_URL } = process.env;

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use.");
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await User.create({ ...req.body, password: hashedPassword, avatarURL, verificationToken });
    const mail = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`
    };
    await sendEmail(mail);
    res.json({
        user: {
            email: newUser.email,
            subscripton: newUser.subscription
        }
    });
};

module.exports = registerUser;