/**
 * create a mw will check if the request body is proper and correct
 */
const authconfig=require("../config/auth.config.js")
const jwt=require("jsonwebtoken")
const user_model=require("../models/user.model.js")
const verifySignupBody=async (req,res,next)=>{
    try {
        //ccheck for the name
        // check for all filedds
        //check if the user is present already or not

        if(!req.body.name){
            return res.status(400).send({
                message:"Failed!name was not provided"
            })
        }
        if(!req.body.email){
            return res.status(400).send({
                message:"Failed!email was not provided"
            })
        }
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed!userId was not provided"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message:"Failed!password was not provided"
            })
        }


        const user =await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message:"Failed!user already  prseneted"
            })
        }

        next()

    } catch (error) {
        console.log("Error whilevalidating the request body")
        res.status(500).send({
            message:"error while validating the request body"
        })
    }
}
const verifySiginbody=async (req,res,next)=>{
    try {
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed!userId was not provided"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message:"Failed!password was not provided"
            })
        }
        next()
    } catch (error) {
        console.log("Error whilevalidating the request body")
        res.status(500).send({
            message:"error while validating the request body"
        })
    }
}

const verifyToken=(req,res,next)=>{
    //check if the token is present in header
    const token=req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message:"No token found ,and ur unauthorised"
        })
    }
    //if its a valid token
jwt.verify(token,authconfig.secret,async (err,decoded)=>{
    if(err){
        return res.status(401).send({
            message:"Unauthorized!"
        })
    }
    const user=await user_model.findOne({userId:decoded,id})
    if(!user){
        return res.status(401).send({
            message:"Unauthorized!,this user for this token doesnot exit"
        })
    }
    req.user=user
    next()
})

    //then move to next
  
}
const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user,userType=="ADMIN"){
        next()
    }
    else{
        return res.status(403).send({
            message:"Online admin user can access"
        })
    }
}
module.exports={
    verifySignupBody:verifySignupBody,
    verifySiginbody:verifySiginbody,
    verifyToken:verifyToken
}