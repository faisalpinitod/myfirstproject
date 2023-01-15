const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    dob:String,
    role:String,
    location:String,
    password:String
})

const UserModel=mongoose.model("user",userSchema)


module.exports={
    UserModel
}