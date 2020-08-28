import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Router from "./components/Router";

function App() {
  return (
    <>
      <Router isLoggedIn={false} />
    </>
  );
}

export default App;
