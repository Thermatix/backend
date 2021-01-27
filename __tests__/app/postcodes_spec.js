import * as postcodes from "../../app/postcodes.js";

describe("postcodes", () => {
    describe("lookup", () => {
        var postcode = "E147TW";

        test("it should return latlon for given postcode", async () => {
            var latlon = await postcodes.lookup(postcode);
            expect(latlon).toEqual("51.514912, -0.032999");
        });
    });

    describe("batch_lookup", () => {
        var PostcodesList = ["E147TW", "E61HE"];

        test("it should return an array of latlon for given postcodes", async () => {
            var latlon = await postcodes.batch_lookup(PostcodesList);
            expect(latlon).toEqual(["51.514912, -0.032999", "51.535268, 0.044517"]);
        });
    })
});
