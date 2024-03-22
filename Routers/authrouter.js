const authcontroller = require ("../controllers/authcontroller.js")

module.exports=(app)=>{
    app.post("/ecom/api/v1/auth/signup",authcontroller.signup)

}