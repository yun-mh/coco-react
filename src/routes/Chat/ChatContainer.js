import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_CHATROOMS,
  GET_FRIENDS,
  VIEW_CHATROOMS,
} from "../../queries/Main/MainQueries";
import ChatPresenter from "./ChatPresenter";

const ChatContainer = ({
  location: {
    state: { id },
  },
}) => {
  const [rooms, setRooms] = useState([]);
  const [friends, setFriends] = useState([]);

  const { data: newData } = useSubscription(GET_CHATROOMS, {
    variables: { id },
  });

  const { loading, data } = useQuery(VIEW_CHATROOMS);

  const { loading: friendLoading, data: friendData } = useQuery(GET_FRIENDS);

  useEffect(() => {
    if (!loading) {
      const { viewChatRooms } = data;
      setRooms([...viewChatRooms]);
    }
  }, [loading, data]);

  useEffect(() => {
    if (!friendLoading) {
      const {
        viewMyself: { following },
      } = friendData;
      setFriends([...following]);
    }
  }, [friendLoading, friendData]);

  const handleNewChatroom = () => {
    if (newData !== undefined) {
      const { getChatrooms } = newData;
      let target = rooms.find((room) => room.id === getChatrooms.id);
      if (target === undefined) {
        setRooms((prev) => [getChatrooms, ...prev]);
      } else {
        setRooms((prev) => {
          target = getChatrooms;
        });
      }
    }
  };

  useEffect(() => {
    if (newData !== undefined) {
      handleNewChatroom();
    }
  }, [newData]);

  return (
    <ChatPresenter
      loading={loading}
      rooms={rooms}
      friendLoading={friendLoading}
      friends={friends}
      currentUser={id}
    />
  );
};

export default withRouter(ChatContainer);
