const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51MG9oOBz01CJ9SFFoArDqlVuqYpCm7kEF6sdi4QbtPFfbe7tB08pKWud7E4l2YUYZ2aRWTMHdcNgGbw9iwRH78L000aFeY5nJM');


const app = express();


app.use(cors({origin:true}));
app.use(express.json());

// res.header( "Access-Control-Allow-Origin" );

app.get('/',(request, response)=> response.status(200).send('hello,world'));

app.post('/payments/create',async (request, response) =>{
    const total = request.query.total;
    console.log('recieved',total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
} )

exports.api = functions.https.onRequest(app)

