import React, { useState } from "react";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/client";
import {
  TOGGLE_LIKE,
  ADD_COMMENT,
  VIEW_POST,
  DELETE_POST,
  VIEW_FEED,
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
  myId,
}) => {
  const ITEMS = 3;

  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const [deletePostMutation] = useMutation(DELETE_POST, {
    variables: {
      id,
      action: "DELETE",
    },
    refetchQueries: () => [
      { query: VIEW_FEED, variables: { offset: 0, limit: ITEMS } },
    ],
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

  const handleDeletePost = async () => {
    try {
      const { data: editPost } = await deletePostMutation();
      if (editPost) {
        setIsPopoverOpen(false);
      }
    } catch (e) {
      console.warn(e);
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
      myId={myId}
      isPopoverOpen={isPopoverOpen}
      setIsPopoverOpen={setIsPopoverOpen}
      handleLike={handleLike}
      handleDeletePost={handleDeletePost}
      handleAddComment={handleAddComment}
      modalIsOpen={modalIsOpen}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default PostContainer;
