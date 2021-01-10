import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { X, Edit2 } from "react-feather";
import moment from "moment";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextareaAutosize from "react-autosize-textarea";
import ScrollToBottom from "react-scroll-to-bottom";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";

const UserColumn = styled.div`
  ${tw`flex flex-col justify-center ml-3 h-10 lg:h-16`}
`;

const Location = styled.span`
  ${tw`text-xs text-gray-600`}
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  ${tw`w-full h-quarter md:h-threequarter bg-cover`}
`;

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  ${tw`h-full flex flex-col md:flex-row`}
`;

const ImageContainer = styled.div`
  ${tw`w-full md:w-1/2 h-full`}
`;

const ContentContainer = styled.div`
  ${tw`w-full md:w-1/2 px-5 relative`}
`;

const ModalHeader = styled.div`
  ${tw`flex justify-between py-5 h-20`}
`;

const UserInfo = styled.div`
  ${tw`flex items-center`}
`;

const ModalAvatar = styled.img`
  ${tw`w-8 h-8 bg-primary-light rounded-full`}
`;

const ModalClose = styled.div`
  ${tw`invisible md:visible`}
`;

const ModalCaption = styled.p`
  ${tw`pb-5`}
`;

const Comment = styled.div`
  ${tw`flex py-2`}
`;

const CommentContent = styled.div`
  ${tw`ml-2`}
`;

const CommentDate = styled.div`
  ${tw`text-xs text-gray-500`}
`;

const AddCommentContainer = styled.div`
  ${tw`w-full pr-8 h-16 flex items-center absolute bottom-0`}
`;

export default ({
  id,
  user,
  location,
  caption,
  files,
  comments,
  newComment,
  handleAddComment,
  modalIsOpen,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-4/5 md:w-2/3 md:h-threequarter bg-white rounded-lg shadow overflow-hidden"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalContainer>
        <ImageContainer>
          <Slider {...settings}>
            {files &&
              files.map((file) => <Image key={file.id} url={file.url} />)}
          </Slider>
        </ImageContainer>
        <ContentContainer>
          <ModalHeader>
            <UserInfo>
              <Link
                to={{
                  pathname: `/user/${user.username}`,
                  state: { id: user.id },
                }}
              >
                <ModalAvatar src={user.avatar} />
              </Link>
              <UserColumn>
                <Link
                  to={{
                    pathname: `/user/${user.username}`,
                    state: { id: user.id },
                  }}
                >
                  <span className="font-semibold">{user.username}</span>
                </Link>
                <Location>{location ? location : "　"}</Location>
              </UserColumn>
            </UserInfo>
            <ModalClose>
              <span onClick={closeModal}>
                <X size={30} className="text-gray-600 cursor-pointer" />
              </span>
            </ModalClose>
          </ModalHeader>
          <ModalCaption>{caption}</ModalCaption>
          <ScrollToBottom className="overflow-y-auto h-quarter md:h-half shadow-inner p-2">
            {comments &&
              comments.map((comment) => (
                <Comment key={comment.id}>
                  <Link
                    to={{
                      pathname: `/user/${comment.user.username}`,
                      state: { id: comment.user.id },
                    }}
                    className="flex-none"
                  >
                    <ModalAvatar src={comment.user.avatar} />
                  </Link>
                  <CommentContent>
                    <p className="text-sm">
                      <Link
                        to={{
                          pathname: `/user/${comment.user.username}`,
                          state: { id: comment.user.id },
                        }}
                      >
                        <span className="font-semibold mr-2">
                          {comment.user.username}
                        </span>
                      </Link>
                      {comment.text}
                    </p>
                    <CommentDate>
                      {moment(comment.createdAt).format("ll")}
                    </CommentDate>
                  </CommentContent>
                </Comment>
              ))}
          </ScrollToBottom>
          <AddCommentContainer>
            <TextareaAutosize
              className="w-full h-10 border px-3 py-1 mr-3 flex justify-center"
              maxRows={2}
              value={newComment.value}
              onChange={newComment.onChange}
              placeholder="コメント入力"
              async={true}
            />
            <button className="focus:outline-none" onClick={handleAddComment}>
              <Edit2 className="text-gray-600" />
            </button>
          </AddCommentContainer>
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};
