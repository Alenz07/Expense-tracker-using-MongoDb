const user = require("../models/users")
const users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
postData=async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const hash_pass = await bcrypt.hash(password,5)
        const posting = await users.create({
             name:name,email:email,password:hash_pass
        })
        res.json("info added")
    } catch (error) {
       res.status(400).json(error)
    }
}
postData2=async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await users.findOne({email:email}
        )
        if (!user) {
            return res.status(400).json("User not found")
        }
        
       
        const isMatch = await bcrypt.compare(password, user.password)  
        
        if (!isMatch) { 
            return res.status(400).json("Wrong password")
        }
        const secret_key = "mynameisdivesh"
        const token = jwt.sign({email:email},secret_key)
        res.status(200).json({message:"token is sent", userId: token,email:email})
    
    } catch (error) {
       res.status(400).json(error)
    }
}
set_Premium = async (req,res)=>{
    try {
        const{email} = req.body
        const setting  = await users.updateOne({email:email},{isPremium:true},)
        res.send("now you are premium user")
    } catch (error) {
       res.status(400).send("this is not working")
       
    }

}

if_premium = async(req,res)=>{
    try {
        const { email} = req.headers
        const info = await users.findOne({
            email
        }).select("isPremium")
        res.json(info)
    } catch (error) {
        console.log(error)
    }


}

module.exports  = {postData,postData2,set_Premium,if_premium}