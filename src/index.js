import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import moment from "moment";
import "moment/locale/ja";
import "./assets/styles.css";
import client, { persistor } from "./apollo/client";
import { PersistProvider } from "./apollo/PersistContext";

moment.locale("ja");

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <PersistProvider persistor={persistor}> */}
      <App />
      {/* </PersistProvider> */}
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
