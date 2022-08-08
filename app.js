const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/utils/date.js");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {

    const day = date.getDay();
    const today = date.getDate();

    let city = "Colombo";
    const appID = "5f39ac098bfb1d20edb29bbc65746da8";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + "&units=" +units;

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].main;
            const wind = weatherData.wind.speed;
            const precipitation = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            // const cityName = weatherData.name;
            const country = weatherData.sys.country;

            res.render("home",
                {
                    kindOfDay: day,
                    Date: today,
                    temperature: temp,
                    description: desc,
                    PRECIPITATION: precipitation,
                    HUMIDITY: humidity,
                    WIND: wind,
                    City: city,
                    Country: country
                }
            );

        });

    });

});

app.post("/", function(req, res){

    console.log(req.body.location);

    res.redirect("/");

});



app.listen(port, function () {
    console.log("Server started on port" + port + ".");
});