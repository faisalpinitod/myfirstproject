const mongoose=require("mongoose")
// require("dotenv").config()
const connection=mongoose.connect("mongodb+srv://Faisalpinitod:faisal@cluster0.y2f7t.mongodb.net/myfirstp?retryWrites=true&w=majority")


module.exports={
    connection
}