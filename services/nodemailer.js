const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "mewzeno194@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

async function ChangePass(userEmail, resetToken) {
    const resetURL = resetToken;
  
    const mailOptions = {
      from: `"Your App Name" <yourgmail@gmail.com>`,
      to: userEmail,
      subject: "Reset Your Password",
      text: `Click the link to reset your password: ${resetURL}`,
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below:</p>
        <a href="${resetURL}" target="_blank">${resetURL}</a>
      `,
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent:", info.messageId);
  }
  
  module.exports = ChangePass;