require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const apiai = require('api.ai');
const port = 3000 || process.env.PORT;


const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));

  const ai = new apiai({
    token: process.env.CLIENT_TOKEN,
    session: process.env.API_KEY
  });

const newMessage = [];


app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    const message = req.body.message;

      
    ai.text(message, (error, response) => {
        if(error) {
            console.log(error);
            
        } else {
            const data = response.result.fulfillment.speech;
           console.log(data);
           
            newMessage.push(data);
            res.redirect("message");
        }
    });
    
});


app.get("/message", (req, res) => {

    res.send("<h1>" + newMessage + "</h1>");
});



app.listen(port, (req, res) => {
    console.log(`server is running on ${port}`);
    
});