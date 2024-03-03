const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/helpinghands")
.then(() => console.log("succesful"))
.catch((error) =>console.log(error)) 




