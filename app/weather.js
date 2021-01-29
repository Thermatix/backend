import * as got from 'got';

var API_KEY = "3a942c751bbcb44bb13d97f651d4f062";

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
   return `${urlBase()}?${args}&${apiKey()}`
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

function urlBase() {
   return `https://api.openweathermap.org/data/2.5/weather`
}
