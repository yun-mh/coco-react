import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { X, Heart, MessageSquare } from "react-feather";
import moment from "moment";
import Modal from "react-modal";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Avatar from "../Avatar";
import ScrollContainer from "react-indiana-drag-scroll";
import TextareaAutosize from "react-autosize-textarea";
import { useScrollBodyLock } from "../../hooks/useScrollBodyLock";

const Post = styled.div`
  ${tw`bg-white px-2 rounded-lg`}
`;

const Header = styled.header`
  ${tw`flex items-center p-4`}
`;

const UserColumn = styled.div`
  ${tw`flex flex-col justify-center ml-3 h-10 lg:h-16`}
`;

const Location = styled.span`
  ${tw`text-xs text-gray-600`}
`;

const Caption = styled.p`
  ${tw`p-3`}
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  ${tw`w-full h-quarter md:h-half bg-cover`}
`;

const Meta = styled.div`
  padding: 15px;
`;

const Button = styled.span`
  ${tw`cursor-pointer text-gray-600`}
`;

const LikeCount = styled.span`
  ${tw`text-gray-600 ml-1 mr-3`}
`;

const CommentCount = styled.span`
  ${tw`text-gray-600 ml-1 mr-3`}
`;

const Buttons = styled.div`
  ${tw`flex items-center`}
`;

const Timestamp = styled.span`
  ${tw`block text-right font-light text-gray-500 border-b text-xs my-2 pb-2`}
`;

const customStyles = {
  // content: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  // },
};

const ModalAvatar = styled.img`
  ${tw`w-8 h-8 bg-primary-light rounded-full`}
`;

Modal.setAppElement("#root");

export default ({
  id,
  user: { username, avatar },
  location,
  caption,
  files,
  isLiked,
  likeCount,
  comments,
  commentCount,
  createdAt,
  handleLike,
  modalIsOpen,
  openModal,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [value, setValue] = useState(0);
  const [subValue, setSubValue] = useState(0);

  console.log(comments);

  const onChange = (value) => {
    setValue(value);
  };

  const onChangeSub = (subValue) => {
    setSubValue(subValue);
  };

  return (
    <Post>
      <Header>
        <Avatar url={avatar} />
        <UserColumn>
          <Link to={`/${username}`}>
            <span className="font-semibold">{username}</span>
          </Link>
          <Location>{location ? location : "　"}</Location>
        </UserColumn>
      </Header>
      <Carousel value={value} onChange={onChange}>
        {files && files.map((file) => <Image key={file.id} url={file.url} />)}
      </Carousel>
      <Dots value={value} onChange={onChange} number={files.length} />
      <Caption>{caption}</Caption>
      <Meta>
        <Buttons>
          <Button onClick={handleLike}>
            {isLiked ? (
              <Heart size={28} className="text-red-400" />
            ) : (
              <Heart size={28} />
            )}
          </Button>
          <LikeCount>{likeCount}</LikeCount>
          <Button onClick={openModal}>
            <MessageSquare size={28} />
          </Button>
          <CommentCount>{commentCount}</CommentCount>
        </Buttons>
        <span text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        <Timestamp>{moment(createdAt).format("ll")}</Timestamp>
      </Meta>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={lock}
        onAfterClose={unlock}
        shouldFocusAfterRender
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-2/3 h-threequarter bg-white rounded-lg shadow"
        overlayClassName="Overlay flex justify-center items-center"
      >
        <div className="h-full flex flex-col relative">
          <div className="h-full flex flex-col md:flex-row flex-1 p-3">
            <div className="w-full md:w-1/2 p-3">
              <Carousel value={subValue} onChange={onChangeSub}>
                {files &&
                  files.map((file) => <Image key={file.id} url={file.url} />)}
              </Carousel>
              <Dots
                value={subValue}
                onChange={onChangeSub}
                number={files.length}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 relative">
              <div className="flex justify-between py-2 h-20">
                <div className="flex items-center">
                  <ModalAvatar src={avatar} />
                  <UserColumn>
                    <Link to={`/${username}`}>
                      <span className="font-semibold">{username}</span>
                    </Link>
                    <Location>{location ? location : "　"}</Location>
                  </UserColumn>
                </div>
                <div className="invisible md:visible">
                  <span onClick={closeModal}>
                    <X size={30} className="text-gray-600 cursor-pointer" />
                  </span>
                </div>
              </div>
              <p className="pb-3 border-b border-gray-300">{caption}</p>
              {/* <ScrollContainer
                className="overflow-y-auto"
                horizontal={false}
                hideScrollbars={false}
              > */}
              <div className="overflow-y-auto max-h-1/2">
                {comments &&
                  comments.map((comment) => (
                    <div key={comment.id} className="flex py-2">
                      <ModalAvatar src={comment.user.avatar} />
                      <div className="ml-2">
                        <p className="text-sm">
                          <span className="font-semibold mr-2">
                            {comment.user.username}
                          </span>
                          {comment.text}
                        </p>
                        <div className="text-xs text-gray-500">
                          {moment(comment.createdAt).format("ll")}
                        </div>
                      </div>
                    </div>
                  ))}
                {/* </ScrollContainer> */}
              </div>
              <div className="w-full h-16 flex flex-row justify-end">
                <TextareaAutosize className="h-10 w-full border" maxRows={3} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Post>
  );
};
