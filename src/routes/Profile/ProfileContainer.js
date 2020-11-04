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
  const [addDogModalIsOpen, setIsAddDogModalOpen] = useState(false);
  const [followersModalIsOpen, setIsFollowersModalOpen] = useState(false);
  const [followingsModalIsOpen, setIsFollowingsModalOpen] = useState(false);

  const { loading, data } = useQuery(VIEW_USER, { variables: { id } });

  const openAddDogModal = () => {
    setIsAddDogModalOpen(true);
  };

  const closeAddDogModal = () => {
    setIsAddDogModalOpen(false);
  };

  const openFollowersModal = () => {
    setIsFollowersModalOpen(true);
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const openFollowingsModal = () => {
    setIsFollowingsModalOpen(true);
  };

  const closeFollowingsModal = () => {
    setIsFollowingsModalOpen(false);
  };

  return (
    <ProfilePresenter
      currentUser={id}
      loading={loading}
      data={data}
      addDogModalIsOpen={addDogModalIsOpen}
      openAddDogModal={openAddDogModal}
      closeAddDogModal={closeAddDogModal}
      followersModalIsOpen={followersModalIsOpen}
      followingsModalIsOpen={followingsModalIsOpen}
      openFollowersModal={openFollowersModal}
      closeFollowersModal={closeFollowersModal}
      openFollowingsModal={openFollowingsModal}
      closeFollowingsModal={closeFollowingsModal}
    />
  );
};

export default withRouter(ProfileContainer);
