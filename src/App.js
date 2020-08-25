import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Router from "./components/Router";

const Test = styled.div`
  ${tw`bg-teal-500 border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
`;

function App() {
  return <Router isLoggedIn={false} />;
}

export default App;
