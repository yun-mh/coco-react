import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "@apollo/client";
import { VIEW_USER } from "../../queries/Main/MainQueries";

const ProfileContainer = ({
  location: {
    state: { id },
  },
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { loading, data } = useQuery(VIEW_USER, { variables: { id } });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ProfilePresenter
      loading={loading}
      data={data}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default withRouter(ProfileContainer);
