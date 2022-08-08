const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/utils/date.js");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){

    const day = date.getDay();
    const today = date.getDate();

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=5f39ac098bfb1d20edb29bbc65746da8";

    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].main;
            const wind = weatherData.wind.speed;
            const precipitation = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;

        });

        res.render("home",
            {
                kindOfDay: day, 
                Date: today,
                temperature: temp,
                description: desc,
                PRECIPITATION: precipitation,
                HUMIDITY: humidity,
                WIND: wind
            }
        );

    });

});



app.listen(port, function(){
    console.log("Server started on port" + port + ".");
});