import * as postcodes from "../../app/postcodes.js";

describe("postcodes", () => {
    describe("lookup", () => {
        var postcode = "E14 7TW";

        test("it should return latlon for given postcode", async () => {
            var latlon = await postcodes.lookup(postcode);
            expect(latlon).toEqual("51.514912, -0.032999");
        });

        describe("when not given a string", () => {
            var postcode = null;
            var errorMsg = "Arg is not a string";

            test("it should throw an error", async ()=> {
                try {
                    await postcodes.lookup(postcode);
                } catch (error) {
                    expect(error).toEqual(new TypeError(errorMsg));
                }
            })
        })

        describe("when given a postcode in the incorrect format", () => {
            var postcode = "E14 7T";
            var errorMsg = "result was undefined, Postcode format could be incorrect";

            test("it should throw an error", async ()=> {
                try {
                     await postcodes.lookup(postcode);
                } catch (error) {
                    expect(error).toEqual(new Error(errorMsg));
                }
            })

        })
    });

    describe("batch_lookup", () => {
        var PostcodesList = ["E14 7TW", "E6 1HE"];

        test("it should return an array of latlon for given postcodes", async () => {
            var latlon = await postcodes.batch_lookup(PostcodesList);
            expect(latlon).toEqual(["51.514912, -0.032999", "51.535268, 0.044517"]);
        });

        describe("when not given an array", () => {
            var PostcodesList = null;
            var errorMsg = "Arg is not an array";

            test("it should throw an error", async ()=> {
                try {
                    await postcodes.batch_lookup(PostcodesList);
                } catch (error) {
                    expect(error).toEqual(new TypeError(errorMsg));
                }
            })
        })

        describe("when given a postcode in the incorrect format", () => {
            var PostcodesList = ["E14 7T", "E6 1HE"];

            test("it should return an array of latlon for given postcodes with unformated being null", async () => {
                var latlon = await postcodes.batch_lookup(PostcodesList);
                expect(latlon).toEqual([null, "51.535268, 0.044517"]);
            });
        })
    })


});
