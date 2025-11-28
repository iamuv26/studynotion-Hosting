const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("MAIL_HOST:", "smtp-relay.brevo.com");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS (first 5 chars):", process.env.MAIL_PASS ? process.env.MAIL_PASS.substring(0, 5) : "UNDEFINED");

    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })


    let info = await transporter.sendMail({
      from: 'StudyNotion || CodeHelp - by Babbar',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log(info);
    return info;
  }
  catch (error) {
    console.log(error.message);
    throw error;
  }
}


module.exports = mailSender;
