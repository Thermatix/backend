const postcodes = require('node-postcodes.io')

export async function lookup(postcode_string) {
    var result = (await postcodes.lookup(postcode_string))["result"];
    return `${result["latitude"]}, ${result["longitude"]}`;
}

export async function batch_lookup(postcodes_array) {
    var results = (await postcodes.lookup(postcodes_array))["result"];
    return postcodes_array.map((postcode) => {
        var result = results.find((r) => { return r["query"] == postcode })["result"];
        return `${result["latitude"]}, ${result["longitude"]}`
    });
}
