const path = require('path');
const fs = require('fs').promises;
const Jimp = require("jimp");
const { userModel: { User } } = require("../../models");
const { HttpError } = require('../../helpers');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res, next) => {
    if (!req.file) throw HttpError(400, "File with avatar missed.");
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    try {
        (await Jimp.read(tempPath)).resize(250, 250).write(tempPath);
        const newAvatarName = `${_id}_${originalname}`;
        const resultedPath = path.join(avatarsDir, newAvatarName);
        await fs.rename(tempPath, resultedPath);
        const avatarURL = path.join("avatars", newAvatarName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempPath);
        throw error;
    }
};

module.exports = updAvatar;