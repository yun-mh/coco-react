import React from "react";
import { withRouter } from "react-router-dom";
import ChatPresenter from "./ChatPresenter";
import { useQuery } from "@apollo/client";
import { VIEW_USER } from "../../queries/Main/MainQueries";

const ChatContainer = () => {
  //   const { loading, data } = useQuery(VIEW_USER, { variables: { id } });

  return <ChatPresenter />;
};

export default withRouter(ChatContainer);
