const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("invalid email")
        }
    },
    textarea: {
        type: String,
        required: true,
        minLength: 3
    }
})


const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;