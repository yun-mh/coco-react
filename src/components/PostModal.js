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
  font-size: 0.5rem;
  ${tw`sm:text-xs text-gray-600`};
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  height: 30vh;
  ${tw`w-full md:h-threequarter bg-cover bg-center`}
`;

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  ${tw`h-full flex flex-col md:flex-row`}
`;

const ImageContainer = styled.div`
  ${tw`w-full md:w-1/2`}
`;

const ContentContainer = styled.div`
  ${tw`w-full md:w-1/2 px-5 h-full flex flex-col justify-between`}
`;

const ModalHeader = styled.div`
  ${tw`flex justify-between py-5 h-20`}
`;

const UserInfo = styled.div`
  ${tw`flex items-center`}
`;

const ModalAvatar = styled.img`
  ${tw`w-6 h-6 sm:w-8 sm:h-8 bg-primary-light rounded-full`}
`;

const ModalClose = styled.div`
  ${tw`invisible md:visible`}
`;

const ModalCaption = styled.p`
  ${tw`pb-5`}
`;

const CommentContainer = styled(ScrollToBottom)`
  height: 28vh;
  ${tw`overflow-y-auto md:h-half shadow-inner p-2`}
`;

const Comment = styled.div`
  ${tw`flex py-2`}
`;

const CommentContent = styled.div`
  ${tw`text-xs sm:text-base ml-2`}
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
      className="w-4/5 md:w-2/3 h-mentire md:h-threequarter bg-white rounded-lg shadow overflow-hidden"
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
          <div className="flex flex-grow flex-col justify-between">
            <CommentContainer>
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
                      <p className="text-xs sm:text-sm">
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
            </CommentContainer>
            <AddCommentContainer>
              <TextareaAutosize
                className="w-full text-xs sm:text-base h-8 sm:h-10 border px-3 py-1 mr-3 flex justify-center"
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
          </div>
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};
