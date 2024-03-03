const mongoose = require("mongoose");
const validator = require("validator");

const donateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    amount: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("invalid email")
        }
    }
})


const donate = mongoose.model("donate", donateSchema);
module.exports = donate;