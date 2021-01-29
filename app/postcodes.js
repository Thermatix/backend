const postcodes = require('node-postcodes.io')

export async function lookup(postcodeString) {
    if (typeof postcodeString != "string") {
        throw new TypeError("Arg is not a string")
    }
    var result = (await postcodes.lookup(postcodeString))["result"];
    checkResult(result)
    return `${result["latitude"]}, ${result["longitude"]}`;
}

export async function batch_lookup(postcodesArray) {
    if (!postcodesArray || postcodesArray.constructor !== Array) {
        throw new TypeError("Arg is not an array")
    }
    var results = (await postcodes.lookup(postcodesArray))["result"];
    return postcodesArray.map((postcode) => {
        var result = results.find((r) => { return r["query"] == postcode })["result"];
        try {
            return `${result["latitude"]}, ${result["longitude"]}`
        } catch(_) {
            return null
        }
    });
}

function checkResult(result) {
    if (typeof result == 'undefined') {
        throw new Error("result was undefined, Postcode format could be incorrect")
    }
}
