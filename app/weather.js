import * as got from 'got';

var API_KEY = "";

export async function getWeatherFor(latlng_string) {
    return await got(buildUrl(urlLatLng(...latlng_string.split(',')))).text();
}

function buildUrl(args) {
   return `${urlBase()}?${args}&${apiKey()}`
}

function urlLatLng(lat,lon) {
    return `lat=${parseInt(lat)}&lon=${parseInt(lon)}`
}

function apiKey() {
    return `appid=${API_KEY}`
}

function urlBase() {
   return `https://api.openweathermap.org/data/2.5/weather`
}
