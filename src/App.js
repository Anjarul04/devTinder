const express  = require('express');

const app = express();



app.get("/user",(req,res)=>{
    res.send("Hello my name is anjarul get");
})

app.post("/user",(req,res)=>{
    res.send("Hello my name is anjarul post");
})

app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
})

app.use("/user",(req,res)=>{
    res.send("wildcard");
})

app.listen(7777,()=>{
    console.log('listening on port no 7777...');
});