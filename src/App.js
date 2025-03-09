const express  = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.use("/hello",(req,res)=>{
    res.send("Hello on namaste node js");
})

app.use("/test",(req,res)=>{
    res.send("Hello World!");
})

app.listen(7777,()=>{
    console.log('listening on port no 7777...');
});