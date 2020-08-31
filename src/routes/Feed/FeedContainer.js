import React from "react";
import FeedPresenter from "./FeedPresenter";
import { useQuery } from "@apollo/client";
import { VIEW_FEED } from "../../queries/Main/MainQueries";

const FeedContainer = () => {
  const ITEMS = 3; // fix this later
  const { loading, data } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });
  console.log(data);

  return <FeedPresenter loading={loading} data={data} />;
};

export default FeedContainer;
