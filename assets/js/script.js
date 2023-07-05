var getUrl = "https://api.openweathermap.org/data/2.5/forecast?id=3686110&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8"

fetch(getUrl)
    .then((Response)=>{
        return Response.json();
        })
        .then((data)=>{
            console.log(data.city.name);
            generateHTML(data);
            });


function generateHTML(data){

    renderCurrentMainCity(data);

    renderFiveDayForecast(data);
}


function renderCurrentMainCity(data){
    $('#mainCity').text(data.city.name);
    $('#mainTemp').text(data.list[0].main.temp);
    $('mainWind').text(data.list[0].wind.speed);
    $('mainHumidity').text(data.list[0].main.humidity);
}


function renderFiveDayForecast(data){
    var fiveDatsForecastEL = $("#fiveDayForecast").children();
    for (const iterator of fiveDatsForecastEL) {
        console.log(iterator);
        
    }
}