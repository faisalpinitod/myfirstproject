const express=require("express")
const {connection}=require("./config/db")
const cors=require("cors")
const {userRouter}=require("./routes/user.route")
const {noteRouter}=require("./routes/note.route")
const { authenticate } = require("./middleware/authenticate.middleware")
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
      res.send("Home Page")
})
app.get("/about",(req,res)=>{
      res.send("About API")
})
app.get("/contact",(req,res)=>{
      res.send("contact page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)

// app.get("/data",async(req,res)=>{
//       try{
//         const token=req.query.token
//         jwt.verify(token,"masai",(err,decoded)=>{
//             if(err){
//                res.send("Envalid Token")
//                console.log(err)
//             }else{
//                res.send("Data...")
//             }
//             })
        
//       }catch(err){
//         console.log(err)
//         console.log("Something went wrong")
//       }
      
// })


// app.get("/cart",(req,res)=>{
//     const token=req.headers
//     try{
//         jwt.verify(token,"masai",(err,decoded)=>{
//             if(err){
//                res.send("Envalid Token")
//                console.log(err)
//             }else{
//                res.send("Cart...")
//             }
//         })
//     }catch(err){
//         console.log(err)
//         console.log("Something went wrong")
//     }
// })






app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log({"err":err})
    }
    console.log("The server is running at 8080")
})