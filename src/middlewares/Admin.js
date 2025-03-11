const adminAuth = (req,res,next)=>{
    const check = "xyz";
    const authorized = check === "xyz";
    if(authorized){
        next();
    }else{
        res.status(404).send("you are not authorized");
    }
}

const userAuth = (req,res,next)=>{
    const check = "xyz";
    const authorized = check === "xyz";
    if(authorized){
        next();
    }else{
        res.status(404).send("you are not authorized");
    }
}

module.exports={adminAuth,userAuth};