const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

router.get('/', (req, res) => {
  res.send({ msg: "getting contacts" });
});

router.post("/", (req, res) => {
 const { name, email, message, subject } = req.body;
  console.log(process.env.EMAIL, process.env.PASS);
  console.log(email, name, subject, message);
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    // secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `${email}`,
    to: "zanelemoni4@gmail.com",
    subject: `${subject}`,
    text: `${name} has contacted you please contact them back on ${email} ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400).send({ msg: "email not sent" });
    } else {cont-
      console.log("Email sent: " + info.response);
      res.send({ msg: "email has been sent successfully" });
    }
  });
});

module.exports = router;
