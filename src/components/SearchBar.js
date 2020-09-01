import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { LOCAL_LOG_OUT } from "../queries/Auth/AuthQueries";

const SearchBarWrapper = styled.div`
  ${tw`sticky z-20 top-0 w-full h-16 flex flex-row items-center justify-center border-b bg-white`}
`;

const SearchBar = () => {
  const [logUserOut] = useMutation(LOCAL_LOG_OUT);
  return (
    <SearchBarWrapper>
      検索バー
      <button onClick={logUserOut}>logout</button>
      {/* delete later */}
    </SearchBarWrapper>
  );
};

export default SearchBar;
