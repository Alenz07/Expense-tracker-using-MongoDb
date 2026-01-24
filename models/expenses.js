
// const sequelize = require("../utils/database")

// const{DataTypes} = require("sequelize")

// const trackForm = sequelize.define("trackform", {
//     id:{
// type: DataTypes.INTEGER,
// primaryKey: true,
// autoIncrement: true,
// allowNull: true
//     },
// amountSpend:{
//     type:DataTypes.STRING,
    
// },
// where:{
//     type: DataTypes.STRING
// },
// description:{
//     type: DataTypes.STRING
// }

// })



const mongoose  = require("mongoose")

const trackFormSchema =  new mongoose.Schema({
    amountSpend:{
        type: Number,
        required: true
    },
    where:{
        type: String
        
    },
    description:{
        type:String
    },
    userEmail:{
        type: String,
        ref: "user"

    }
},{
    timestamps:true
})

const trackFormModel = mongoose.model("trackForm", trackFormSchema)

module.exports = trackFormModel
