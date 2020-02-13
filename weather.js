// appid=d17f91bb78baa526880d9a1d6f3fe2a5

var localOffset;

//console.log( new Date());

var day = new Date().getDate();
var month = new Date().getMonth();
console.log(month);
var year = new Date().getFullYear();
var months = ["January","February","March","April","May","June","July","August","September","Oktober","Nowember","December"];

document.getElementById("dateInfo").innerHTML = `${day} ${months[month]} ${year}`;

setInterval( () => {
    var loctime = new Date().toLocaleTimeString();
    // console.log('loctime :', loctime)
    document.getElementById("localTime").innerHTML = loctime
}, 1000);




document.getElementById('submit').addEventListener('click', addCity);

function addCity () {

    var city = document.getElementById('cityName').value;

    // var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid= {kendi id'nizi yazmayi unutmayiniz} &units=metric&lang=tr`;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d17f91bb78baa526880d9a1d6f3fe2a5&units=metric&lang=tr`;
    // & ile istediğimiz kadar parametre verebiliyoruz
                                                        
    fetch(url)
        .then( response => response.json())
        .then( data => {
            console.log(data);

            var cityName = data.name;
            var country = data.sys.country;

            var temperature = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;
            var pressure = data.main.pressure;

            var weatherIconId = data.weather[0].icon;
            var description = data.weather[0].description;

            localOffset = (data.timezone / 3600);           // saat cinsinden zaman farkini verecek ( 1 saat = 3600 saniye)

            // to be able to show div block (display: block)
            document.getElementById('show').style.display = 'block';

            document.getElementById('cityNameSpan').innerHTML = `${cityName}, ${country}`;
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
            document.getElementById('weatherInfo').innerHTML = description;

            document.getElementById('citytemp').innerHTML = `${temperature} ℃`;
            document.getElementById('wind').innerHTML = `${windSpeed} m/s`;
            document.getElementById('humid').innerHTML = `${humidity} %`;
            document.getElementById('pres').innerHTML = `${pressure} hpa`;
        })
        .catch( error => console.log(error))
}


setInterval(function () {
    // local date and time
    let d = new Date();
    //console.log(d);

    // GMT date and time
    // The getTime() method returns the number of milliseconds between midnight of January 1, 1970 and the specified date.
    // The getTimezoneOffset() method returns the time difference between UTC time and local time, in minutes.
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    //console.log(utc);

    
    // date and time in city
    let nd = new Date(utc + (3600000 * localOffset));  // 1 saat = 3.600.000 milisaniye
    //console.log(nd);

    // time in city
    // The toLocaleTimeString() method returns the time portion of a Date object as a string, using locale conventions.
    let ndCity = nd.toLocaleString();
    //console.log(ndCity);

     document.getElementById('timeInfo').innerHTML = ndCity
}, 1000);