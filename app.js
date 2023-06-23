require("dotenv").config();
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const app = express();

const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    Credential:true,
    exposeHeaders: ["X-auth-token"],
};

app.listen(port, () => {
    console.log(`server running at ${port}`);
});

app.use(cors(corsOption));

const typeDefs = gql(
    fs.readFileSync("./schema.graphql" , { encoding: "utf-8"})

);

const resolvers = require("./resolvers");

const apolloServer = new ApolloServer({ typeDefs, resolvers});
apolloServer.start().then(res => {
apolloServer.applyMiddleware({ app, path: "/graphql" });
});


