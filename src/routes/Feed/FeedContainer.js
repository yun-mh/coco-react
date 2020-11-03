import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { VIEW_FEED, CHECK_MYSELF } from "../../queries/Main/MainQueries";
import FeedPresenter from "./FeedPresenter";

const FeedContainer = () => {
  const ITEMS = 4;

  const [myId, setMyId] = useState();
  const [canFetchMore, setCanFetchMore] = useState(true);

  const { loading: myLoading, data: myData } = useQuery(CHECK_MYSELF);

  const { loading, data, fetchMore } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });

  const onEndReached = async () => {
    if (!loading && data) {
      const res = await fetchMore({
        variables: {
          offset: data?.viewFeed?.length,
          limit: ITEMS,
        },
      });
      if (res.data.viewFeed.length === 0) {
        setCanFetchMore(false);
      }
    }
  };

  useEffect(() => {
    if (!myLoading) {
      setMyId(myData?.viewMyself?.id);
    }
  }, [myData, myLoading]);

  return <FeedPresenter loading={loading} data={data} myId={myId} onEndReached={onEndReached} canFetchMore={canFetchMore} />;
};

export default withRouter(FeedContainer);
