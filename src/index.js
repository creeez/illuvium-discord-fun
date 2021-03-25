import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import typeDefs from "./graphql/schema";

import App from "./App";

import "./styles/index.scss";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  link: new HttpLink({
    uri: "https://twilight-fire.us-west-2.aws.cloud.dgraph.io/graphql",
  }),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
