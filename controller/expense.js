require('dotenv').config();
const { users } = require("../models");
const trackform  = require("../models/expenses")

const genAi = require("@google/genai")
const ai = new genAi.GoogleGenAI({
    apiKey:process.env.GOOGLE_API
  });

post_data = async(req,res)=>{
    const userEmail = req.userEmail

    try {
        const{amountSpend,where,description} = req.body
        const adding  = await trackform.create({
            amountSpend:amountSpend,where:where,description:description,userEmail: userEmail      
        }  
      )   
       res.send("info is send")
    } catch (error) {
        console.log(error)
    }
}

get_data = async(req,res)=>{
    const userEmail = req.userEmail
    const rows = Number(req.query.rows)||5
    let page = Number(req.query.currPage)||1
    const offset = (page-1)*rows
    
    try {
        const totalCount = await trackform.countDocuments({
            userEmail: userEmail 
        });

        const totalPages = Math.ceil(totalCount / rows);
        
        // If current page is empty but there are expenses, redirect to last valid page
        if (page > totalPages && totalCount > 0) {
            page = totalPages;
        }
        
        const data = await trackform.find({
             userEmail: userEmail
            
        }).sort("createdAt: -1").skip((page-1)*rows).limit(rows)

        
        res.json({
            data:data,
            totalPages:totalPages,
            currentPage: page,
            shouldRedirect: page > totalPages && totalCount > 0
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Failed to fetch expenses"})
    }
}
delete_data = async(req,res)=>{
try {
    const id = req.params.id
    console.log(id)
    const deleeee = await trackform.findByIdAndDelete(
       id
    )
    res.send("deleted yess")
    console.log("yes deleted")
} catch (error) {
    console.log(error)
}
}

creating_leaderboard = async(req,res)=>{
    try {
        // const data = await trackform.find({
        //    attributes:["userEmail",
        //    [sequelize.fn("SUM",sequelize.col("amountSpend")),"totalexpenses"]],
        //    include:[{
        //     model:users,
        //     attributes:["name"]
        //    }],
        //    group:["userEmail","user.name"],
        //    order:[[sequelize.fn('SUM', sequelize.col('amountSpend')), 'DESC']],

        // })
        const data = await trackform.aggregate([
            // 1️⃣ Group expenses by userEmail and sum amountSpend
            {
              $group: {
                _id: "$userEmail",
                totalexpenses: { $sum: "$amountSpend" }
              }
            },
          
            // 2️⃣ Join with users collection
            {
              $lookup: {
                from: "users",            // users collection
                localField: "_id",         // userEmail from trackform
                foreignField: "email",     // email in users collection
                as: "user"
              }
            },
          
            // 3️⃣ Convert user array → single object
            { $unwind: "$user" },
          
            // 4️⃣ Shape output like Sequelize
            {
              $project: {
                _id: 0,
                userEmail: "$_id",
                totalexpenses: 1,
                user: {
                  name: "$user.name"
                }
              }
            },
          
            // 5️⃣ Sort descending by totalexpenses
            { $sort: { totalexpenses: -1 } }
          ]);
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
ask_Ai = async(req,res)=>{
    try {
       
        const{data} = req.body
        const json = JSON.stringify(data)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `  **Respond in  innerHTML max 2-3 lines, provide observation of expenses and how it could be improved provide table with percentage spend of what 
${json}
`,
            generationConfig: {
                maxOutputTokens: 100,  // Limit to ~75-100 words
                temperature: 0.1,       // Optional: creativity level (0-1)
            }
          });

          res.json(response.text)
    } catch (error) {
        console.log(error)
    }
}
async function update_data(req, res) {
    try {
        const { id } = req.params;
        const { amountSpend, where, description } = req.body;
        
        await trackform.findByIdAndUpdate( id,
            { amountSpend, where, description },
            
        );
        
        res.status(200).json({ message: "Expense updated successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update expense" });
    }
}

module.exports  = {post_data,get_data,delete_data,creating_leaderboard,ask_Ai,update_data}
