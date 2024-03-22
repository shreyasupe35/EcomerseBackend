/**
 * i need to write the controller logic to register a user
 */

const secret=require("../config/auth.config.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
exports.signup=async(req,res)=>{
     /**
      * logic to create the user
      */
     /**
      * 1Read the request Body
      */
     const request_body=req.body
     //2.insert the data in the users collection in mongodb

     const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
     }

     try {
        const user_created=await user_model.create(userObj)
        /**
         * return the user
         */
         const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
         }
        res.status(201).send(res_obj)
     } catch (error) {
        console.log("Error while registring the user",error)
        res.status(500).send({
         message:"Some error happened while registering the user"
        })
     }
     //3.return the response back to the user
}


exports.signin=async (req,res)=>{
   //check if user id is present
   const user=await user_model.findOne({userId:req.body.userId});
   if(user==null){
      return res.status(400).send({
         message:"User id is not valid user ID"
      })
   }

   //password is correct
   const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
   if(!isPasswordValid){
     return  res.status(401).send({
         message:"Wrong password passed"
      })
   }

   //using jwt we will create the acess token with a given ttl and return
   const token=jwt.sign({id:user.userId},secret.secret,{
      expiresIn:120
   })

   res.status(200).send({
      name:user.name,
      userId:user.userId,
      email:user.email,
      userType:user.userType,
      accessToken:token
   })


}
