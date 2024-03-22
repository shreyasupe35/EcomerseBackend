/**
 * i need to write the controller logic to register a user
 */
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
