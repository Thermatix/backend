import * as weather from "../../app/weather.js";

describe("weather", () => {
    describe("getWeatherFor", () => {
        var latlon_string = "51.514912, -0.032999"; //for E147TW

        test("it should return weather details as a json", async () => {
            var result = await weather.getWeatherFor(latlon_string);
            var [lat, lon] = latlon_string.split(',');

            expect(result).toContain(parseInt(lat))
            expect(result).toContain(parseInt(lon))
            expect(result).toContain("weather")
        })
    })
})
