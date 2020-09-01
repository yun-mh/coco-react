import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Search } from "react-feather";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOCAL_LOG_OUT } from "../queries/Auth/AuthQueries";
import useInput from "../hooks/useInput";

const SearchBarWrapper = styled.div`
  ${tw`sticky z-20 top-0 w-full h-16 flex flex-row items-center justify-center border-b bg-white`}
`;

const SearchInput = styled.input`
  ${tw`border border-gray-400 ml-1 px-5 py-1 rounded-full focus:outline-none focus:border-primary`}
`;

const SearchBar = ({ history }) => {
  const search = useInput("");

  const [logUserOut] = useMutation(LOCAL_LOG_OUT);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <SearchBarWrapper>
      <Search className="text-gray-500" />
      <form onSubmit={onSearchSubmit}>
        <SearchInput
          value={search.value}
          onChange={search.onChange}
          placeholder="検索"
        />
      </form>
      <button onClick={logUserOut}>logout</button>
      {/* delete later */}
    </SearchBarWrapper>
  );
};

export default withRouter(SearchBar);
