import * as got from 'got';

const baseUrl = "https://api.postcodes.io";

export async function lookup(postcodeString) {

    if (!postcodeString || typeof postcodeString != "string") {
        throw new TypeError("Arg is not a string")
    }

    var result = await checkResult(async () => {
        return await retreiveResult(postCodeUrl(postcodeString))
    })
    return `${result["latitude"]}, ${result["longitude"]}`;
}

export async function batch_lookup(postcodesArray) {
    if (!postcodesArray || postcodesArray.constructor !== Array) {
        throw new TypeError("Arg is not an array")
    }
    var results = await checkResult(async () => {
        var r = await retreiveResult(postCodeUrl(), {postcodes: postcodesArray});
        return r
    })

    return postcodesArray.map((postcode) => {
        var result = results.find((r) => { return r["query"] == postcode })["result"];
        try {
            return `${result["latitude"]}, ${result["longitude"]}`
        } catch(_) {
            return null
        }
    });
}

async function retreiveResult(url, data) {
    if (!!data) {
        return JSON.parse((await got.post(url, { json: data })).body)["result"];

    } else {
        return JSON.parse((await got(url)).body)["result"];
    }
}

function postCodeUrl(postcode) {
    if (!postcode) {
        return `${baseUrl}/postcodes`
    } else {
        return `${baseUrl}/postcodes/${postcode}`
    }
}

async function checkResult(callback) {
    try {
        var result = await callback();
        if (typeof result == 'undefined') {
            throw ''
        }

        return result;

    } catch(_e) {
        throw new Error("result was undefined or not found, Postcode format could be incorrect")
    }

}
