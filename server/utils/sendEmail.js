const { createTransport } = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

module.exports = async (to, otp, name, subject, template) => {
  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 465,
    auth: {
      user: process.env.SEND_IN_BLUE_USERNAME,
      pass: process.env.SEND_IN_BLUE_PASSWORD,
    },
  });

  // using custom email template with nodemailer express handler
  const handlebarsOptions = {
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: {
      name: "Arabity",
      address: process.env.SEND_IN_BLUE_USERNAME,
    },
    to: to,
    subject: subject,
    template: template,
    context: {
      name,
      otp,
    },
  };
  return transporter.sendMail(mailOptions);
};
