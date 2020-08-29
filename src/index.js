import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import "./assets/styles.css";
import client, { persistor } from "./apollo/client";
import { PersistProvider } from "./apollo/PersistContext";

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
