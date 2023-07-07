
var mainCity = "toronto";

fetchThedata(mainCity);

function fetchThedata(city) {

    var getCurrentDayApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8`
    var getForecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=aadc9fe8c2258ddedabb7ac0233418e8`

    fetch(getForecastApi)
        .then((response) => {
            if (response.status === 404) {
                displayErrorToast();
                return;
            } else {
                return response.json();
            }
        })
        .then((data) => {
            renderFiveDayForecast(data);
        });

    fetch(getCurrentDayApi)
        .then((response) => {
            if (response.status === 404) {
                displayErrorToast();
                return;
            } else {
                return response.json();
            }
        })
        .then((data) => {
            renderCurrentMainCity(data);
        });
}


function renderCurrentMainCity(data) {
    $('#mainCity').text(data.name);
    //transform temp to only two decimal places
    $('#mainTemp').text(`${(data.main.temp).toFixed()}°C`);
    //transform from default date to MMMM D, YYYY
    $('#currentDate').text(dateWithNoTime());
    $('#currentWeather').text(`${data.weather[0].main}`);
    $('mainWind').text(data.wind.speed);
    $('mainHumidity').text(data.main.humidity);
    $('#mainImage').attr("src",`assets/img/${data.weather[0].icon}_f.png`);

}

function renderFiveDayForecast(data) {

    for (let index = 0; index < data.list.length; index = index + 8) {

        var singleLiEl = $("<li>");
        $("#fiveDayForecast").append(singleLiEl);

        //transform from YYYY MM DD hh:mm:ss -> DDD using DAYJS
        singleLiEl.append($("<h5>").text(dateToShortDay(data.list[index].dt_txt)));

        //tranform to temperature with no decimal places
        singleLiEl.append($("<smallTemp>").text(`${(data.list[index].main.temp).toFixed()}°C`));

        singleLiEl.append($("<div>", { "class": "smallLabels" })
            .append(
                $("<p>").text("Weather:"),
                $("<p>").text("Wind:"),
                $("<p>").text("Humidity:")
            ));
        singleLiEl.append($("<div>", { "class": "smallInfo" })
            .append(
                $("<p>").text(`${data.list[index].weather[0].main}`),
                $("<p>").text(`${data.list[index].main.humidity} mph`),
                $("<p>").text(`${data.list[index].main.humidity} %`)
            ));
    }

}

function displayErrorToast() {
    $(".toast").removeClass("hide");
    var mainCity = "toronto";
    fetchThedata(mainCity);
}

//utility functions

function dateToShortDay(date) {
    return dayjs(date).format('ddd');
}

function dateWithNoTime() {
    return dayjs().format('dddd MMMM D, YYYY');
}

function eraseOldForecast() {
    $("#fiveDayForecast").children().remove();
}

function lookForCity(event) {
    mainCity = $("#input-city").val();
    eraseOldForecast();
    fetchThedata(mainCity);
}

function switchCity(event) {
    mainCity = (event.target).textContent;
    eraseOldForecast();
    fetchThedata(mainCity);

}

function hideToast(event) {
    event.preventDefault();
    $(".toast").addClass("hide");
}

// event listeners
$("aside").on("click", "#search", lookForCity);
$("aside").on("click", ".city", switchCity);


$(".toast").on("click", ".btn-clear", hideToast);
