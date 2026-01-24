const reset = require("../models/resetting");
const bcrypt = require("bcrypt")
const users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const ChangePass = require("../services/nodemailer");
const { UpscaleImageResponse } = require("@google/genai");

async function resetPass(req, res) {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email: email } );
    if (!user) {
      return res.status(400).json({ message: "No email found" });
    }
    const Resetid = uuidv4();
    await reset.create({
      Resetid: Resetid,
      email: email,
      isActive: true
    });
    console.log("request in forgot table created")
    const resetLink = `http://localhost:2000/reset/password/${Resetid}`;
    ChangePass(email, resetLink);
    return res.json({ message: "Reset Link Sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
}
async function updatePass(req, res) {
    const id = req.params.id;

    try {
        const request = await reset.findOne({
           Resetid: id }
        );
        console.log("match found");

        // if request not found or link is expired
        if (!request || !request.isActive) {
            return res.json({ msg: "The link has expired" });
        }

        // send reset form
        return res.send(`
            <form action="/reset/password/${id}" method="POST">
                <input type="password" name="newPassword" placeholder="New Password" required>
                <button type="submit">Update</button>
            </form>
        `);

    } catch (error) {
        console.log("not found", error);
        return res.status(500).json({ msg: "Server error" });
    }
}
async function setNew(req,res){
    const id = req.params.id
    
    const newPassword = req.body.newPassword
    try {
        const response = await reset.findOne({
           Resetid:id
        })
        console.log(response)
        const user = await users.findOne( { email: response.email } );
console.log("found in user table")
        const hashPass = await bcrypt.hash(newPassword,5)
        const update = await users.update({password:hashPass}, {where:{
            email:user.email
        }})
        console.log("pass changed")
        const update2 = await reset.updateOne({ Resetid: id },
            { isActive: false }
            
        );
        res.json("password changed")
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"Not Working"})
    }
}
module.exports = {resetPass,updatePass,setNew};