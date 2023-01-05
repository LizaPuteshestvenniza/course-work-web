const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51MG9oOBz01CJ9SFFoArDqlVuqYpCm7kEF6sdi4QbtPFfbe7tB08pKWud7E4l2YUYZ2aRWTMHdcNgGbw9iwRH78L000aFeY5nJM');


const app = express();


app.use(cors());
app.use(express.json());



app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log("Payment Request Recieved BOOM!!! for this amount >>>", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "inr",
        metadata: { integration_check: "accept_a_payment" },
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);