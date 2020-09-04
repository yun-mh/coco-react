import React, { useState } from "react";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/client";
import { TOGGLE_LIKE } from "../../queries/Main/MainQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount: likeCountProp,
  isLiked: isLikedProp,
  comments,
  commentCount,
  createdAt,
  caption,
  location,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    try {
      setIsLiked((p) => !p);
      await toggleLikeMutation();
    } catch (error) {
      console.log(error);
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

  return (
    <PostPresenter
      id={id}
      user={user}
      files={files}
      likeCount={likeCount}
      isLiked={isLiked}
      location={location}
      caption={caption}
      comments={comments}
      commentCount={commentCount}
      createdAt={createdAt}
      handleLike={handleLike}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default PostContainer;
