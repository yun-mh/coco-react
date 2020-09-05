import React, { useState } from "react";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/client";
import {
  TOGGLE_LIKE,
  ADD_COMMENT,
  VIEW_POST,
} from "../../queries/Main/MainQueries";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const comment = useInput("");

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value,
    },
    refetchQueries: () => [{ query: VIEW_POST, variables: { id } }],
  });

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

  const handleAddComment = async () => {
    if (comment.value === "") {
      return;
    }

    try {
      await addCommentMutation();
    } catch (error) {
      toast.error("コメント作成に失敗しました。もう一度試してください。");
    } finally {
      comment.setValue("");
    }
  };

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
      newComment={comment}
      handleLike={handleLike}
      handleAddComment={handleAddComment}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default PostContainer;
