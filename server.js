const express = require('express')
const https = require('https');
const bodyparser = require("body-parser")
const app = express()

app.use(bodyparser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")


})



app.post("/", function (req, res) {
    const name=req.body.cityName
     

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=2eae687ec3300ac88b0c3ee371f3326f&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode)
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon
            const imgUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.send(`<h1 style=margin-left:500px;>The temperature of ${name} is ${temp}</h1><br><img style=margin-left:700px; src=${imgUrl}>`)
          

        })
        
    })
  




})


app.listen(3000)



