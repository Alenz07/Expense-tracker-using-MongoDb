// const { default: mongoose } = require("mongoose")
// const sequelize = require("../utils/database")
// const{DataTypes} = require("sequelize")
// const user = sequelize.define("user",{
//     name:{
//         type: DataTypes.STRING
//     }, 
//     email:{
//         primaryKey: true,
//         type: DataTypes.STRING
//     },
//     password:{
//         type:DataTypes.STRING,
        
//     },
//     isPremium:{
//      type:DataTypes.BOOLEAN,
//      defaultValue: false

//     }
// })


const mongoose  = require("mongoose")
const userSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isPremium:{
        type: Boolean,
        default: false
    }
})
const userModel  = mongoose.model("user", userSchema)
module.exports = userModel