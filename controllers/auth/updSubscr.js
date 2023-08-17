const { userModel: { User } } = require("../../models");

const updSubscr = async (req, res, next) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body,{new:true});
    res.json(result);
};

module.exports = updSubscr;