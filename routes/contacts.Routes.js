const express = require("express");
const nodemailer = require("nodemailer");
const app = express.Router();
require("dotenv").config();

app.post("/", (req, res) => {
  let { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      email: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "zanelemoni4@gmail.com",
    subject: "Sending Email using Node.js",
    text: `${name} has contacted you please contact them back on ${email} ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "email not sent" });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: "email has been sent successfully" });
    }
  });
});

module.exports = app;
