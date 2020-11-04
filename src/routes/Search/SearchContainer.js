import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import SearchPresenter from "./SearchPresenter";
import { CHECK_MYSELF, SEARCH } from "../../queries/Main/MainQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];

  const [tab, setTab] = useState("user");

  const { data: userData } = useQuery(CHECK_MYSELF);

  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
    },
  });

  return (
    <SearchPresenter
      currentUser={userData?.viewMyself?.id}
      searchTerm={term}
      loading={loading}
      data={data}
      tab={tab}
      setTab={setTab}
    />
  );
});
