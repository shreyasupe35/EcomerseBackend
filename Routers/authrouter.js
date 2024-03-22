const authcontroller = require ("../controllers/authcontroller.js")
const authMW=require("../middleware/auth.mw.js")
module.exports=(app)=>{
    app.post("/ecom/api/v1/auth/signup",[authMW.verifySignupBody],authcontroller.signup)

}