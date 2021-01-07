import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare, MoreHorizontal } from "react-feather";
import moment from "moment";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
// import Carousel, { Dots } from "@brainhubeu/react-carousel";
// import "@brainhubeu/react-carousel/lib/style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from "../Avatar";
import PostModal from "../PostModal";

const Post = styled.div`
  ${tw`bg-white rounded-lg shadow`}
`;

const Header = styled.header`
  ${tw`flex items-center justify-between p-4`}
`;

const PostHeader = styled.div`
  ${tw`flex items-center`}
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
  ${tw`w-full flex items-end justify-between p-5`}
`;

const Button = styled.span`
  ${tw`cursor-pointer text-gray-600 hover:text-gray-400 transition duration-150 ease-in-out`}
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
  ${tw`block text-right font-light text-gray-500 text-xs`}
`;

export default ({
  id,
  user,
  location,
  caption,
  files,
  isLiked,
  likeCount,
  comments,
  commentCount,
  createdAt,
  myId,
  handleLike,
  newComment,
  handleDeletePost,
  handleAddComment,
  modalIsOpen,
  openModal,
  closeModal,
}) => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Post>
      <Header>
        <PostHeader>
          <Link
            to={{
              pathname: `/user/${user.username}`,
              state: { id: user.id },
            }}
          >
            <Avatar url={user.avatar} />
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
        </PostHeader>
        {myId === user.id ? (
          <Tooltip
            interactive
            position="bottom"
            trigger="click"
            arrow="true"
            theme="light"
            html={
              <ul className="bg-white flex flex-col px-8 py-3">
                <li
                  className="text-red-400 text-center cursor-pointer"
                  onClick={handleDeletePost}
                >
                  削除
                </li>
              </ul>
            }
          >
            <MoreHorizontal className="text-gray-600 cursor-pointer" />
          </Tooltip>
        ) : (
          ""
        )}
      </Header>
      <Slider {...settings} value={value} onChange={onChange}>
        {files && files.map((file) => <Image key={file.id} url={file.url} />)}
      </Slider>
      {/* <Dots
        value={value}
        onChange={onChange}
        number={files.length}
        className="text-green-500"
      /> */}
      <Caption>{caption}</Caption>
      <Meta>
        <Buttons>
          <Button onClick={handleLike}>
            {isLiked ? (
              <Heart
                size={28}
                className="text-red-400 hover:text-red-200 transition duration-150 ease-in-out"
              />
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
        {/* <span text={likeCount === 1 ? "1 like" : `${likeCount} likes`} /> */}
        <Timestamp>{moment(createdAt).format("lll")}</Timestamp>
      </Meta>

      <PostModal
        id={id}
        user={user}
        location={location}
        caption={caption}
        files={files}
        comments={comments}
        newComment={newComment}
        handleAddComment={handleAddComment}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </Post>
  );
};
