import React from "react";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "@apollo/client";
import { VIEW_USER } from "../../queries/Main/MainQueries";

const ProfileContainer = ({
  location: {
    state: { id },
  },
}) => {
  const { loading, data } = useQuery(VIEW_USER, { variables: { id } });

  return <ProfilePresenter loading={loading} data={data} />;
};

export default withRouter(ProfileContainer);
