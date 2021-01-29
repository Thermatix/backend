import * as express from "express";
import * as postcodes from "./app/postcodes.js";
import * as weather from "./app/weather.js";

const app = express();

app.get("/postcode/:postcode", (req, res) => {
    var postcode = req.params.postcode;
        postcodes.lookup(postcode).then(data => {
            return res.send(data);

        }).catch((error) => {
        return res.status(400).send({status: 400, message: error.message});
    });
});

app.get("/postcodes", (req, res) => {
    var postcodesList = req.query.postcodes;

    postcodes.batch_lookup(postcodesList).then(data => {
        return res.send(data);
    }).catch((error) => {
        return res.status(400).send({status: 400, message: error.message});
    });

})

app.get("/weather/:postcode", (req, res) => {
    var postcode = req.params.postcode;

    postcodes.lookup(postcode).then(latLonString => {
        weather.getWeatherFor(latLonString).then(data => {
            return res.send(data);
        })
    }).catch((error) => {
        return res.status(400).send({status: 400, message: error.message});
    });

})

export default app;
