const { contactModel: { Contact } } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json({
        message: 'Contact deleted'
    });
};

module.exports = deleteContact;