const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt= require("bcryptjs")
const jwt =require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        requiered: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        requiered: true

    },
    tokens :[{
        token:{
            type: String,
            requiered: true
        }
    }]
})
userSchema.methods.generateAuthToken= async function(){
    try {
        console.log(this._id)
      const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)  
      this.tokens=this.tokens.concat({token:token})
      await this.save();
      console.log(token)
      return token
    } catch (error) {
        res.send("error")
        console.log("error")
    }
}
userSchema.pre("save",async function(next){
 if(this.isModified("password")){

    // console.log(`the current password is ${this.password}`)
    // const password= await bcrypt.hash(password,10)
 this.password=await bcrypt.hash(this.password,10)
 
//  console.log(`the current password is ${this.password}`)
 this.confirmpassword=undefined
 }
 next()
})


const User = mongoose.model("User", userSchema);
module.exports = User;