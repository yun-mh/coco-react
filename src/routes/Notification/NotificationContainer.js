import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import NotificationPresenter from "./NotificationPresenter";
import { useQuery, useSubscription } from "@apollo/client";
import {
  VIEW_NOTIFICATION,
  GET_NOTIFICATION,
} from "../../queries/Main/MainQueries";

const NotificationContainer = ({
  location: {
    state: { id },
  },
}) => {
  const [notifications, setNotifications] = useState([]);

  const { loading, data } = useQuery(VIEW_NOTIFICATION);

  const { data: newData } = useSubscription(GET_NOTIFICATION, {
    variables: { id },
  });

  useEffect(() => {
    if (!loading) {
      const { viewNotification } = data;
      const target = viewNotification.filter((item) => item.from.id !== id);
      setNotifications([...target]);
    }
  }, [loading, data, id]);

  const handleNewNotification = () => {
    if (newData !== undefined) {
      const { getNotification } = newData;
      setNotifications((prev) => [getNotification, ...prev]);
    }
  };

  useEffect(() => {
    handleNewNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);

  return (
    <NotificationPresenter
      loading={loading}
      notifications={notifications}
      currentUser={id}
    />
  );
};

export default withRouter(NotificationContainer);
