import * as weather from "../../app/weather.js";

describe("weather", () => {
    describe("getWeatherFor", () => {
        var latLonString = "51.514912, -0.032999"; //for E147TW

        test("it should return weather details as a json", async () => {
            var result = await weather.getWeatherFor(latLonString);
            var [lat, lon] = latLonString.split(',');

            expect(result).toContain(parseInt(lat))
            expect(result).toContain(parseInt(lon))
            expect(result).toContain("weather")
        })

        describe("when you don't pass string", () => {
            var latLonString = null;
            var errorMsg = "Arg is not a string";

            test("it should throw an error", async () => {
                try {
                    await weather.getWeatherFor(latLonString);
                } catch (error) {
                    expect(error).toEqual(new TypeError(errorMsg));
                }
            })
        })

        describe("when you pass a string without a delimiter `,`", () => {
            var latLonString = "51.514912 -0.032999";
            var errorMsg = "String has no delimiter `,`";

            test("it should throw an error", async ()=> {
                try {
                    await weather.getWeatherFor(latLonString);
                } catch (error) {
                    expect(error).toEqual(new TypeError(errorMsg));
                }
            })
        })

        describe ("when you pass a string without castable numbers", () => {
            var latLonString = "sdfg, -0.032999";
            var errorMsg = "Lat(NaN) or lon (0) is NaN";

            test("it should throw an error", async ()=> {
                try {
                    await weather.getWeatherFor(latLonString);
                } catch (error) {
                    expect(error).toEqual(new TypeError(errorMsg));
                }
            })
        })
    })
})
