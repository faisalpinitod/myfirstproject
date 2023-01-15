const express=require("express")
const {UserModel}=require("../Models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
userRouter.use(express.json())


userRouter.post("/register",async(req,res)=>{
    try{
        const {email,location,role,dob,password,name} = req.body
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({email,password:hash,location,role,dob,name})
                await user.save()
                console.log(user)
                res.send("Registerd")
            }
        })
     }catch(err){
        console.log(err)
        console.log("Something went wrong")
     }
})



userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email:email})
       if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
           if(result){
                const token=jwt.sign({userID:user[0]._id},"masai")
                res.send({"msg":"Login succesuful","token":token})
           } else{
                res.send("Wrong Credential")
           }
        })  
       }else{
        res.send("Wrong Credentials")
       }
    }catch(err){
       console.log(err)
       console.log("Something went wrong")
    }
    
})

module.exports={
    userRouter
}