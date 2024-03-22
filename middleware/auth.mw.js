/**
 * create a mw will check if the request body is proper and correct
 */
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
module.exports={
    verifySignupBody:verifySignupBody,
    verifySiginbody:verifySiginbody
}