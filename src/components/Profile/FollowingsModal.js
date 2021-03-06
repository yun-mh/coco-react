import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { X } from "react-feather";
import Modal from "react-modal";
import { useScrollBodyLock } from "../../hooks/useScrollBodyLock";
import utils from "../../utils";
import FollowButton from "../FollowButton";

Modal.setAppElement("#root");

const ModalTitle = styled.div`
  ${tw`fixed w-1/2 md:w-1/5 flex items-center justify-center h-12 border-b font-semibold bg-white rounded-t-lg`}
`;

const CloseButton = styled.div`
  ${tw`absolute`}
  right: 10px;
`;

const ModalContainer = styled.div`
  ${tw`mt-12 pb-3 flex flex-col items-center overflow-y-auto`}
  height: calc(100% - 3rem);
`;

const FollowingCard = styled.div`
  ${tw`w-full h-16 flex flex-none justify-between items-center border-b px-3`}
`;

const UserInfo = styled.div`
  ${tw`flex items-center`}
`;

const Avatar = styled.div`
  ${tw`w-8 h-8 bg-center bg-primary-light rounded-full`};
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Username = styled.div`
  ${tw`ml-3`}
`;

export default ({
  currentUser,
  followings,
  modalIsOpen,
  closeModal
}) => {
  const { lock, unlock } = useScrollBodyLock();

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-1/2 md:w-1/5 h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalTitle>
        フォロー中
        <CloseButton onClick={() => closeModal()}>
          <X size={30} className="text-gray-600 cursor-pointer" />
        </CloseButton>
      </ModalTitle>
      <ModalContainer>
        { followings && followings.map(following => (
          <FollowingCard key={following.id}>
            <UserInfo>
              <Avatar url={following.avatar} />
              <Username>{ utils.truncateText(following.username) }</Username>
            </UserInfo>
            <FollowButton currentUser={currentUser} id={following.id} isFollowing={following.isFollowing} isBig={false} />
          </FollowingCard>
        ))}
      </ModalContainer>
    </Modal>
  );
};