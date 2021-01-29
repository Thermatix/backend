import * as request from "supertest"
import app from "../app.js"
import getLatlonFromPostcode from "../app";

describe("App endpoints", () => {
    const invalidFormatString = "result was undefined or not found, Postcode format could be incorrect";

    describe("/postcode/:postcode", () => {
        var postcode = "E14 7TW";

        it("should return lat,lon for the given postcode", async () => {
            var res = await request(app).get(`/postcode/${postcode}`);
            expect(res.statusCode).toEqual(200)
            expect(res.text).toEqual("51.514912, -0.032999");
        })

        describe("when given an incorrectly formated postcode", () => {
            var postcode = "E14 7T";
            it("should return an error status", async () => {
                var res = await request(app).get(`/postcode/${postcode}`);
                expect(res.statusCode).toEqual(400)
                expect(res.text).toContain(invalidFormatString);

            })
        })

        describe("when given an empty formated postcode", () => {
            var postcode = null;
            it("should return an error status", async () => {
                var res = await request(app).get(`/postcode/${postcode}`);
                expect(res.statusCode).toEqual(400)
                expect(res.text).toContain(invalidFormatString);

            })
        })
    })

    describe("/postcodes", () => {
        var postcodes = "postcodes[]=E14 7TW&postcodes[]=E6 1HE";

        it("should return a list of lat,lon for the given postcodes", async () => {
            var res = await request(app).get(`/postcodes?${postcodes}`);
            expect(res.statusCode).toEqual(200);
            expect(res.text).toEqual('["51.514912, -0.032999","51.535268, 0.044517"]');
        })

        describe("when given an incorrectly formated postcode", () => {
            var postcodes = "postcodes[]=E14 7T&postcodes[]=E6 1HE";

            it("should return an array of latlon for given postcodes with unformated being null", async () => {
                var res = await request(app).get(`/postcodes?${postcodes}`);
                expect(res.statusCode).toEqual(200);
                expect(res.text).toEqual('[null,"51.535268, 0.044517"]');

            })
        })

        describe("when given an empty array of postcodes", () => {
            var postcodes = null;

            it("should return an error", async () => {
                var res = await request(app).get(`/postcodes?${postcodes}`);
                expect(res.statusCode).toEqual(400)
                expect(res.text).toContain("Arg is not an array");

            })
        })
    })

    describe("/weather/:postcode", () => {
        var postcode = "E14 7TW";
        var latlon_string = "51.514912, -0.032999"; //for E147TW

        it("should return weather details as a json", async () => {
            var res = await request(app).get(`/weather/${postcode}`);
            expect(res.statusCode).toEqual(200);

            var result = res.text;

            var [lat, lon] = latlon_string.split(',');

            expect(result).toContain(parseInt(lat))
            expect(result).toContain(parseInt(lon))
            expect(result).toContain("weather")
        })

        describe("when given an incorrectly formated postcode", () => {
            var postcode = "E14 7T";
            it("should return an error status", async () => {
                var res = await request(app).get(`/weather/${postcode}`);
                expect(res.statusCode).toEqual(400)
                expect(res.text).toContain(invalidFormatString);

            })
        })

        describe("when given an empty formated postcode", () => {
            var postcode = null;
            it("should return an error status", async () => {
                var res = await request(app).get(`/weather/${postcode}`);
                expect(res.statusCode).toEqual(400)
                expect(res.text).toContain(invalidFormatString);

            })
        })
    })
})
