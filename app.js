const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/",function(req,res){
res.sendFile(__dirname +"\\index.html");
})

app.post("/",function(req,res){
  const city=req.body.CityName;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=c6d442adf9595680af9098f5a91497a4";
  https.get(url,function(response){

    response.on("data",function(data){

      const weather_data=JSON.parse(data);
      const des=weather_data.weather[0].description;
      const temp=weather_data.main.temp;
      const icon=weather_data.weather[0].icon;
      const imageURL=" http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      const description="Temperature of "+_.capitalize(req.body.CityName)+" is "+ temp +" degrees with  "+ des;

        res.render("weatherReport", {description: description, imgsrc: imageURL});

    })

  })

})


app.listen(3000,function(){

  console.log("Server is running on port 3000");
})
