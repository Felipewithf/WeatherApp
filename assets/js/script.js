
var mainCity = "toronto";

fetchThedata(mainCity);

function fetchThedata(city){

    var getUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8`

    fetch(getUrl)
    .then((response)=>{
        if (response.status === 404) {
            displayErrorToast();
            return;
          }else{
        return response.json();
          }
        })
        .then((data)=>{
            generateHTML(data);
            });
}

function generateHTML(data){
    renderCurrentMainCity(data);
    renderFiveDayForecast(data);
}

function renderCurrentMainCity(data){
    $('#mainCity').text(data.city.name);
    //transform temp to only two decimal places
    $('#mainTemp').text(`${(data.list[0].main.temp).toFixed()}°C`);
    //transform from default date to MMMM D, YYYY
    $('#currentDate').text(dateWithNoTime(data.list[0].dt_txt));
    $('mainWind').text(data.list[0].wind.speed);
    $('mainHumidity').text(data.list[0].main.humidity);
}

function renderFiveDayForecast(data){

    for (let index = 0; index < data.list.length; index = index + 8) {

            var singleLiEl = $("<li>");
            $("#fiveDayForecast").append(singleLiEl);
            
            //transform from YYYY MM DD hh:mm:ss -> DDD using DAYJS
            singleLiEl.append($("<h5>").text(dateToShortDay(data.list[index].dt_txt)));
            
            //tranform to temperature with no decimal places
            singleLiEl.append($("<smallTemp>").text(`${(data.list[index].main.temp).toFixed()}°C`));

            singleLiEl.append($("<div>",{"class":"smallLabels"})
                            .append(
                                $("<p>").text("Wind:"),
                                $("<p>").text("Humidity:")
                                ));
            singleLiEl.append($("<div>",{"class":"smallInfo"})
                            .append(
                                $("<p>").text(`${data.list[index].main.humidity} mph`),
                                $("<p>").text(`${data.list[index].main.humidity} %`)
                                ));                               
    }
 
}

function displayErrorToast(){
    $(".toast").removeClass("hide");
    var mainCity = "toronto";
    fetchThedata(mainCity);
}

//utility functions

function dateToShortDay(date){
    return dayjs(date).format('ddd');
}

function dateWithNoTime(date){
    return dayjs(date).format('MMMM D, YYYY')
}

function eraseOldForecast(){
    $("#fiveDayForecast").children().remove();
}

function lookForCity(event){
    mainCity = $("#input-city").val();
    eraseOldForecast();
    fetchThedata(mainCity);
}

function switchCity(event){
    mainCity = (event.target).textContent;
    eraseOldForecast();
    fetchThedata(mainCity);

}

function hideToast(event){
    event.preventDefault();
    $(".toast").addClass("hide");
}

// event listeners
$("aside").on("click","#search",lookForCity);
$("aside").on("click",".city",switchCity);


$(".toast").on("click",".btn-clear",hideToast);
