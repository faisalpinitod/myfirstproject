const express=require("express")
const {NoteModel}=require("../Models/Note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    try{
        const data =req.query
        const note= await NoteModel.find(data)
        
        console.log(note)
        res.send(note)
    }catch(err){
        console.log(err)
    }
})
noteRouter.post("/create",async(req,res)=>{
    try{
        const payload=req.body
        const note=new NoteModel(payload)
        await note.save()
        res.send("Created the notes")
    }catch(err){
        console.log(err)
        res.send({"err":"Something went wrong"})
    }
   
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const Id=req.params.id
    const data=req.body
    const note=await NoteModel.findOne({"_id":Id})
    console.log(note)
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            const note=await NoteModel.findByIdAndUpdate({"_id":Id},data)
            console.log(note)
            res.send("note is updated")
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    
    try{
        const note=await NoteModel.findByIdAndUpdate({"_id":Id})
        console.log(note)
        res.send("note is deleted")

    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})




module.exports={
    noteRouter
}