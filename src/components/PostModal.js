import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { X, Edit2 } from "react-feather";
import moment from "moment";
import Modal from "react-modal";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
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
  ${tw`w-full h-quarter md:h-half bg-cover`}
`;

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  ${tw`h-full p-3 flex flex-col md:flex-row items-center`}
`;

const ImageContainer = styled.div`
  ${tw`w-full md:w-1/2 p-3`}
`;

const ContentContainer = styled.div`
  ${tw`w-full md:w-1/2 px-3`}
`;

const ModalHeader = styled.div`
  ${tw`flex justify-between py-2 h-20`}
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
  ${tw`pb-3 border-b border-gray-300`}
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
  ${tw`w-full h-16 flex items-center`}
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

  const [subValue, setSubValue] = useState(0);

  const onChangeSub = (subValue) => {
    setSubValue(subValue);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-4/5 md:w-2/3 md:h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalContainer>
        <ImageContainer>
          <Carousel value={subValue} onChange={onChangeSub}>
            {files &&
              files.map((file) => <Image key={file.id} url={file.url} />)}
          </Carousel>
          <Dots value={subValue} onChange={onChangeSub} number={files.length} />
        </ImageContainer>
        <ContentContainer>
          <ModalHeader>
            <UserInfo>
              <ModalAvatar src={user.avatar} />
              <UserColumn>
                <Link to={`/${user.username}`}>
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
          <ScrollToBottom className="overflow-y-auto h-quarter md:h-half">
            {comments &&
              comments.map((comment) => (
                <Comment key={comment.id}>
                  <ModalAvatar src={comment.user.avatar} />
                  <CommentContent>
                    <p className="text-sm">
                      <span className="font-semibold mr-2">
                        {comment.user.username}
                      </span>
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
              className="h-10 w-full border px-3 py-1 mr-3 flex justify-center"
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