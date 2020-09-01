import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Search } from "react-feather";
import { useMutation } from "@apollo/client";
import { LOCAL_LOG_OUT } from "../queries/Auth/AuthQueries";

const SearchBarWrapper = styled.div`
  ${tw`sticky z-20 top-0 w-full h-16 flex flex-row items-center justify-center border-b bg-white`}
`;

const SearchInput = styled.input`
  ${tw`lg:w-1/4 border border-gray-400 ml-1 px-5 py-1 rounded-full focus:outline-none focus:border-primary`}
  background-color: ${(props) => props.theme.bgColor};
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const SearchBar = () => {
  const [logUserOut] = useMutation(LOCAL_LOG_OUT);

  return (
    <SearchBarWrapper>
      <Search className="text-gray-500" />
      <SearchInput />
      <button onClick={logUserOut}>logout</button>
      {/* delete later */}
    </SearchBarWrapper>
  );
};

export default SearchBar;
