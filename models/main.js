const mongoose=require("mongoose")
const validator = require("validator");


const mainSchema = new mongoose.Schema({
    textarea: {
        type: String,
        required: true,
        minLength: 3
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  
})

const Main = mongoose.model('Main', mainSchema);

module.exports = Main;





