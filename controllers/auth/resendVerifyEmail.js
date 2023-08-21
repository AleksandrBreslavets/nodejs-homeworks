const { userModel: { User } } = require("../../models");
const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../services");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(404, "User not found.");
    if (user.verify) throw HttpError(400, "Verification has already been passed.");
    const mail = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`
    };
    await sendEmail(mail);
    res.json({
        message: "Verification email sent."
    });
};

module.exports=resendVerifyEmail;