/**
 * post for create category
 */
const auth_mw=require("../middleware/auth.mw.js")
const category_controller=require("../controllers/category.controller")
module.exports=(app)=>{
    app.post("/ecom/api/v1/category",[auth_mw.verifyToken],category_controller.createNewCategory)
}