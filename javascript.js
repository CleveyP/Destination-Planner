//keys
const weatherKey = "46b114fe63fca21a88bf81e35533820f";
const weatherUrl ='https://api.openweathermap.org/data/2.5/weather?';

const foursquareKey = "";
const foursquareSecret = "";
const foursquareUrl = "https://api.foursquare.com/v2/venues/search?"; 
const $submitButton = $("#search-button");

const kelvinToFahrenheit = Kelvin => ((parseFloat(Kelvin) - 273.15) * 9/5 + 32);
// use fetch to get weather data from the weather api


    const venue1 = $("#venue-1");
    const venue2 = $("#venue-2");
    const venue3 = $("#venue-3");
    const venue4 = $("#venue-4");
    const venue5 = $("#venue-5");
    const venuesTotal = $(".venue");
    venuesTotal.hide();


const getWeather = async () => {
    //setup
    const searchBar = $('#search-bar');
    const q = $('#search-bar').val();
    const urlToFetch = weatherUrl +  "q=" + q + "&appid=" + weatherKey ;
    //get data api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


    try{

        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    }
    catch(error){
        console.log(error);
    }
}
const getVenues = async () =>{
//setup
const city = $('#search-bar').val();
const secret = "KRS3UCG5JYCUDJ0XEXSDC0WNLJVL40SKJDASUPNIKYZ5NDAV";
const id= "GYD5NPGY14PEBERYI5FP1M5RN20CTXHLHSTJY3KVUQW1CTPT";
const urlToFetch = foursquareUrl + "client_secret=" + secret + "&client_id="+ id + "&near=" + city + "&limit=10" + "&v=20210906";


try{
    const response = await fetch(urlToFetch);
    if(response.ok){
        jsonResponse = await response.json();
        console.log(jsonResponse);

        return jsonResponse.response.venues;
    }

}
catch(error){
    console.log(error);
}
}


//venues array arg
const renderVenues = (venues) =>{
    
    venue1.children("h3").text(venues[0].name);
    venue2.children("h3").text(venues[1].name);
    venue3.children("h3").text(venues[2].name);
    venue4.children("h3").text(venues[3].name);
    venue5.children("h3").text(venues[4].name);

    venue1.children("p").text(venues[0].location.formattedAddress[0]);
    venue2.children("p").text(venues[1].location.formattedAddress[0]);
    venue3.children("p").text(venues[2].location.formattedAddress[0]);
    venue4.children("p").text(venues[3].location.formattedAddress[0]);
    venue5.children("p").text(venues[4].location.formattedAddress[0]);

   venuesTotal.fadeIn(2000);
}


const renderWeather =  (weatherObject) =>{
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("forecast");
    const city = document.getElementById("city-header");
    city.innerHTML = weatherObject.name;
    city.classList.remove("hidden");
    temperature.innerHTML = `the temperature is: ${kelvinToFahrenheit(weatherObject.main.temp)}F`;
    temperature.classList.remove("hidden");
    description.innerHTML = "Description: " + weatherObject.weather[0].description;
    description.classList.remove("hidden");
}

function search(){
    getWeather().then(forecast => renderWeather(forecast));
    getVenues().then(venues => renderVenues(venues));
}

$submitButton.click(search);
