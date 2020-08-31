import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const SearchBarWrapper = styled.div`
  ${tw`sticky top-0 w-full h-16 flex flex-row items-center justify-center border-b bg-white`}
`;

const SearchBar = () => {
  return <SearchBarWrapper>検索バー</SearchBarWrapper>;
};

export default SearchBar;
