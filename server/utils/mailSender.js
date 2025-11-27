const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("Email sent successfully:", info.response)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    console.error("Mail Config:", {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS ? "****" : "MISSING",
    })
    return error.message
  }
}

module.exports = mailSender
