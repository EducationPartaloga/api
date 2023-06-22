const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const send = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info)
    } catch (err) {

        console.log();
    }
  }

  module.exports = send;