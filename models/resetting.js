// const sequelize = require("../utils/database")

// const{DataTypes} = require("sequelize")

// const user = sequelize.define("forgot",{ 
//     Resetid:{
//         type: DataTypes.STRING
//     }, 
// email:{
//     type:DataTypes.STRING
// },
// isActive:{
//     type:DataTypes.STRING
// }
// })


const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Resetid:{
        type: String
    },
    email:{
        type: String
    },
    isActive:{
        type:String
    }
})

const resetModel = mongoose.model("reset", userSchema)  // ✅ Changed "user" to "reset"
module.exports = resetModel