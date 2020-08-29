import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Routes from "./components/Routes";
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { IS_LOGGED_IN } from "./queries/Auth/AuthQueries";

function App() {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <>
      <Router>
        <>
          <Routes isLoggedIn={data?.isLoggedIn} />
        </>
      </Router>
    </>
  );
}

export default App;
