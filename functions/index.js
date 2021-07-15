const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JDM9gJLHlUqH6jNPiEqHQYdYpu7cE0JPcnzLsZhfqZqlKo63IKedjJjXGJJG1pltZpmPOU8OOGitU6sP02BBMww00Rb1F5vNB"
);

// - App config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("total: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint (into terminal: firebase emulators:start)
// http://localhost:5001/clone-22ee9/us-central1/api
// firebase deploy --only function (to only deploy backend)
