const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const mySchema = require("./graphql/schema");
const myResolver = require("./graphql/resolver");
const mongoose = require("mongoose");
const isAuth = require('./middleware/is-auth');

app.use(isAuth)

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: mySchema,
    rootValue: myResolver,
    graphiql: true,
  })
);


mongoose
  .connect("mongodb://127.0.0.1:27017/event-booking")
  .then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
