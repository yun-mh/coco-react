import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare } from "react-feather";
import PostModal from "./PostModal";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, VIEW_POST } from "../queries/Main/MainQueries";
import { toast } from "react-toastify";

const Overlay = styled.div`
  ${tw`w-full h-full flex justify-center items-center opacity-0 transition-opacity ease-linear bg-primary-light`}
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 18px;
`;

const PostCard = ({
  id,
  user,
  location,
  caption,
  files,
  likeCount,
  comments,
  commentCount,
  file,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const comment = useInput("");

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value,
      token: user.token,
    },
    refetchQueries: () => [{ query: VIEW_POST, variables: { id } }],
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
    <>
      <Container bg={file.url} onClick={openModal}>
        <Overlay>
          <Number>
            <Heart />
            <NumberText>{likeCount}</NumberText>
          </Number>
          <Number>
            <MessageSquare />
            <NumberText>{commentCount}</NumberText>
          </Number>
        </Overlay>
      </Container>

      <PostModal
        id={id}
        user={user}
        location={location}
        caption={caption}
        files={files}
        comments={comments}
        newComment={comment}
        handleAddComment={handleAddComment}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default PostCard;
