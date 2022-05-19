import { deployments, leadTimeFunction } from "./utils";
import express, { response } from "express";
import { print } from "graphql";

// We will cover using dotenv in a later lesson
require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,

  //@ts-ignore
  context: ({ req }) => {
    let authenticated = false;
    if (req.headers.authorization === process.env.TOKEN_SECRET) {
      authenticated = true;
    }
    console.log(authenticated);
    return { authenticated };
  },
});

server.listen().then(() => {
  console.log(
    `
    Server is running!
    Listening on port 4000
    Explore at http://localhost:4000`
  );
});
