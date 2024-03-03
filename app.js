require('dotenv').config()
const express = require("express");
const bcrypt = require("bcryptjs")
const { Error } = require("mongoose");
const nodemailer = require("nodemailer");
require("./db/conn");
const path = require("path")
const Contact = require("./models/usermessage")
const User = require("./models/register")
const Donate = require("./models/donate")
const Main = require("./models/main")

const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

// setting path
const staticpath = path.join(__dirname, "public")
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
const partialspath = path.join(__dirname, "partials")

// Set up the view engine
app.set('view engine', 'hbs');

// Set up the location of your views folder
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'public'));
hbs.registerPartials(partialspath)

// console.log(process.env.SECRET_KEY)




//routing
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/registration", (req, res) => {
    res.render("registration");
})
app.get("/clothes", (req, res) => {
    res.render("clothes");
})
app.get("/foodbank", (req, res) => {
    res.render("foodbank");
})
app.get("/medicalhelp", (req, res) => {
    res.render("medicalhelp");
})
app.get("/raisefunds", (req, res) => {
    res.render("raisefunds");
})
app.get("/main", (req, res) => {
    res.render("main");
})
app.get("/donate", (req, res) => {
    res.render("donate");
})
//for verify mail
const sendVerifyMail = async (name, email, user_id) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'aniketkaushal807@gmail.com',
          pass: 'lywnwfajybnueapv',
        },
      });
  
      const mailOptions = {
        from: 'aniketkaushal807@gmail.com',
        to: email,
        subject: 'Verification Email',
        html: `<p>Hi ${name}, please click <a href="mongodb://127.0.0.1/verify?id=${user_id}">here</a> to verify your email.</p>`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email has been sent:', info.response);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

app.post("/register", async (req, res) => {
    try {

        // res.send(req.body)
        const password = req.body.password
        const cpassword = req.body.confirmpassword
        if (password == cpassword) {
            sendVerifyMail(req.body.name,req.body.email,userData._id);
            const userData = new User(req.body);
            // console.log("the user part"+ userData)
            const token =  await userData.generateAuthToken()
            // console.log("the token part"+ token)
            // password hash
           const registered = await userData.save();
            res.status(201).render("registration");
        } else {
            res.send("password not matching")
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post("/signin", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const useremail = await User.findOne({ email: email })
        const ismatch=await bcrypt.compare(password,useremail.password)
        const token =  await useremail.generateAuthToken()
        // console.log("the token part"+ token)
        if (ismatch) {
            res.status(201).render("main")
        } else {
            res.send("invalid login details")
        }
        // res.send(useremail.password)
        // console.log(useremail)
    } catch (error) {
        res.status(400).send("invalid login details")
    }
})

app.post("/contact", async (req, res) => {
    try {

        // res.send(req.body)
        console.log(req.body)
        const contactData = new Contact(req.body);
        await contactData.save();
        res.status(201).render("index")
    }

    catch (error) {
        res.status(500).send(error)
    }
})
app.post("/donate", async (req, res) => {
    try {

        // res.send(req.body)
        // console.log(req.body)
        const donateData = new Donate(req.body);
        await donateData.save();
        res.status(201).render("donate")
    }

    catch (error) {
        res.status(500).send(error)
    }
})
app.post("/take_away_food",async(req,res)=>{
    try {    
        // res.send(req.body)
        console.log(req.body)
       const main_food=new Main(req.body)
       await main_food.save() 
       res.status(201).render("main")
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(port, () => {
    console.log(`server is runnimg at port number ${port}`)
})
