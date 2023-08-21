const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const transportConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "contacts.info@meta.ua",
        pass: META_PASSWORD
    }
};

const transport = nodemailer.createTransport(transportConfig);

const sendEmail = async data => {
    const email = { ...data, from: "contacts.info@meta.ua" };
    await transport.sendMail(email);
    return true;
};

module.exports = sendEmail;