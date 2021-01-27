import * as request from "supertest"
import app from "../app.js"
import getLatlonFromPostcode from "../app";

describe("App endpoints", () => {
    describe("/postcode/:postcode", () => {
        var postcode = "E147TW";

        test("it should return lat,lon for the given postcode", async () => {
            var res = await request(app).get(`/postcode/${postcode}`);
            expect(res.statusCode).toEqual(200)
            expect(res.text).toEqual("51.514912, -0.032999");
        })
    })

    describe("/postcodes", () => {
        var postcodes = "postcodes[]=E147TW&postcodes[]=E61HE";

        test("it should return a list of lat,lon for the given postcodes", async () => {
            var res = await request(app).get(`/postcodes?${postcodes}`);
            expect(res.statusCode).toEqual(200);
            expect(res.text).toEqual('["51.514912, -0.032999","51.535268, 0.044517"]');
        })
    })

    describe("/weather/:postcode", () => {
        var postcode = "E147TW";
        var latlon_string = "51.514912, -0.032999"; //for E147TW

        test("it should return weather details as a json", async () => {
            var res = await request(app).get(`/weather/${postcode}`);
            expect(res.statusCode).toEqual(200);

            var result = res.text;

            var [lat, lon] = latlon_string.split(',');

            expect(result).toContain(parseInt(lat))
            expect(result).toContain(parseInt(lon))
            expect(result).toContain("weather")
        })
    })
})
