import * as got from 'got';

const API_KEY = "";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherFor(latlng_string) {
    if (typeof latlng_string != "string") {
        throw new TypeError("Arg is not a string")
    }
    if (!latlng_string.includes(',')) {
        throw new TypeError("String has no delimiter `,`")
    }

    return await got.get(buildUrl(urlLatLng(...latlng_string.split(',')))).text();
}

function buildUrl(args) {
   return `${baseUrl}?${args}&${apiKey()}`
}

function urlLatLng(lat,lon) {
    var lat = parseInt(lat);
    var lon = parseInt(lon);

    if (isNaN(lat) || isNaN(lon)) {
        throw new TypeError(`Lat(${lat}) or lon (${lon}) is NaN`)
    };
    return `lat=${lat}&lon=${lon}`
}

function apiKey() {
    return `appid=${API_KEY}`
}
