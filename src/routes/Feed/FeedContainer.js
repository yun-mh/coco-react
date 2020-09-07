import React, { useEffect, useState } from "react";
import FeedPresenter from "./FeedPresenter";
import { useQuery } from "@apollo/client";
import { VIEW_FEED, CHECK_MYSELF } from "../../queries/Main/MainQueries";

const FeedContainer = () => {
  const ITEMS = 3; // fix this later

  const [myId, setMyId] = useState();

  const { loading: myLoading, data: myData } = useQuery(CHECK_MYSELF);

  const { loading, data } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });
  // console.log(data);

  useEffect(() => {
    if (!myLoading) {
      setMyId(myData?.viewMyself?.id);
    }
  }, [myData, myLoading]);

  return <FeedPresenter loading={loading} data={data} myId={myId} />;
};

export default FeedContainer;
