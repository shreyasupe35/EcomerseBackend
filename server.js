const express=require("express");
const mongoose=require("mongoose");
const app=express();
const server_config=require("./config/server.config.js")
const db_config=require("./config/db.config.js")
const user_model=require("./models/user.model.js")
const bcrypt=require("bcryptjs")
// create an admin user at the starting of the application if not already present
// connection with the db

mongoose.connect(db_config.db_url)

const db=mongoose.connection
db.on("error",()=>{
    console.log("Error while connecting to the mongodb")
})

db.once("open",()=>{
    console.log("Connected  to Mongodb")
    init()
})


 async function init(){
    let user = await user_model.findOne({userId:"ADMIN"});

    if(user){
        console.log("Admin is already present")
        return
    }
    try{
        user=await user_model.create({
            name:"shreya",
            userId:"ADMIN",
            email:"shreyasupe7@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("shreya123",8)

        })
        console.log("Admin created",user)
    }
    catch(err){
        console.log("ERROR while creating admin",err)
    }
}

app.listen(server_config.PORT,()=>{
    console.log("Server Started at port number :",server_config.PORT)
})
