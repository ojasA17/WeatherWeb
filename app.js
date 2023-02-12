const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get("/",function(req,res){
    res.render("home");
});
app.get("/index",function(req,res){
    res.render("index");
});

app.post("/",function(req,res){
    const cityName1=req.body.search;
    const appid="c1f6ad21ac6dec7147385884e1f73959";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName1+"&appid="+appid+"&units="+units;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const feeltemp=weatherData.main.feels_like;
        console.log("feels "+feeltemp);
        console.log(temp);
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.render("index",{place:cityName1,url:imageURL,temp:temp,description:description.toUpperCase(),feelTemp:feeltemp});
    });
})
    console.log(req.body.search);
    console.log("post req recieved");
});




app.listen(process.env.PORT || 3000,function(){
    console.log("Server running on 3000");
})