import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare } from "react-feather";
import moment from "moment";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Avatar from "../Avatar";
import PostModal from "../PostModal";

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
  handleLike,
  newComment,
  handleAddComment,
  modalIsOpen,
  openModal,
  closeModal,
}) => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Post>
      <Header>
        <Link
          to={{
            pathname: `/${user.username}`,
            state: { id: user.id },
          }}
        >
          <Avatar url={user.avatar} />
        </Link>
        <UserColumn>
          <Link
            to={{
              pathname: `/${user.username}`,
              state: { id: user.id },
            }}
          >
            <span className="font-semibold">{user.username}</span>
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
