/**
 * controller for creating a category
 */
const category_model=require("../models/category.model.js")

exports.createNewCategory=async (req,res)=>{
    //read the request body
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }
    //create the category object
    try {
        
    const category=await category_model.create(cat_data)
    return res.status(201).send(category)
    } catch (error) {
        console.log("error while creating a category",error)
        res.status(500).send({
            message:"error while creating the category"
        })
    }
    
    //insert the mongodb
    //send the response
}