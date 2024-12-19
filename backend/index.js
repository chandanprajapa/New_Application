const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const newsmodel_1 = require("./models/news");

app.listen(3000 , () => {});

app.get("/", (req , res)=>{
    res.json({ name:"chandan"})
});

app.post("/api/addnews", async (req , res) =>{
    try{
        const news = await newsmodel_1.create(req.body);
        res.status(200).json(news);
        console.log(req.body);
    }
    catch(error){
        res.send(500);
    }
    
});

app.get("api/news", async(req , res)=> {
    try{
        const news = await newsmodel_1.find({});
        res.status(200).json(news);
        console.log(req.body);
    }
    catch(error) {
        res.send(500);
    }
});

app.get("/api/news/:id " , async (req , res) =>{
    try{
        const {id} = req.params;
        const news = await newsmodel_1.findById(id);
        res.status(200).json(news);
    }
    catch(error){
        res.send(500);
    }
});

app.put("/api/news/:id " , async (req , res) =>{
    try{
        const {id} =req.params;
        const news = await newsmodel_1.findByIdAndUpdate(id , req.body);
        if(!news){
            return res.status(404).json({Message: "News not found" });

        }
        const updatenews = await newsmodel_1.findById(id);
        res.status(200).json(updatenews);

    }catch (error){
        res.send(500);
    }
});

app.delete("/api/news/:id" , async(req , res) =>{
    try{
        const{id} = req.params;
        const news = await newsmodel_1.findByIdAndDelete(id , req.body);
        if(!news){
            return res.status(404).json({Message : "News not found"});
        }
        const updatenews = await newsmodel_1.findById(id);
        res.status(200).json("Deleted");

    }catch(error){
        res.send(500);
    }
});

mongoose
    .connect(
        "mongodb://localhost:27017/chandan" 
    )
    .then(() =>{
        console.log("connect to MangoDB");

    });
    