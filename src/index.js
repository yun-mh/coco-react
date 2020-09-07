import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import moment from "moment";
import "moment/locale/ja";
import "./assets/styles.css";
import client from "./apollo/client";

moment.locale("ja");

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
