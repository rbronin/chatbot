require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const apiai = require("api.ai");
const port = 3000 || process.env.PORT;  // defining the port


const app = express();

  app.use(express.static("public")); //serving static files directory
  app.set('view engine', 'ejs'); // template engine setup 
  app.set('views', (__dirname, 'views')); // set the view directory
  app.use(bodyParser.urlencoded({ extended: true })); // body parser setup 

  // setting up the api credentials
  const ai = new apiai({
    token: process.env.CLIENT_TOKEN,
    session: process.env.SESSION_ID
  });


  let userInput = "";
  let data;

///// making  get request on home route
app.get("/", (req, res) => {
    res.render('index', {userMessage: userInput, botReply: data});  
});


///// post request on home route
app.post("/", (req, res) => {
    
    let message = req.body.msg;   // getting data from user input
    userInput = message;

    /// requesting the user message on api.ai
    ai.text(message, (error, response) => {
        if(error) {
            console.log(error);
            
        } else {
            data = response.result.fulfillment.speech; /// getting the response result
           console.log(data);
           res.redirect("/");
        }
    });
   
    
});

/// server setup
app.listen(port, (req, res) => {
    console.log(`server is running on ${port}`);
    
});