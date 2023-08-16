const { contactModel: { Contact } } = require("../../models");

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite=null } = req.query;
    const skip = (page - 1) * limit;
    const query = { owner };
    favorite !== null && (query.favorite = favorite);
    const result = await Contact.find(query,"", {skip, limit:Number(limit)}).populate("owner", "_id email");
    res.json(result)
};

module.exports = getAll;