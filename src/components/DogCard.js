import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import { Heart, MessageSquare } from "react-feather";
import PostModal from "./PostModal";
import useInput from "../hooks/useInput";
import { useMutation } from "@apollo/client";

const Container = styled.div`
  ${tw`w-3/4 h-32 px-4 py-2 flex items-center bg-white rounded-lg`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col`}
`;
const DogImage = styled.img`
  ${tw`w-20 h-20 rounded-lg mr-2`}
`;
const DogHeader = styled.div`
  ${tw`flex flex-row`}
`;
const Name = styled.div`
  ${tw`mr-3`}
`;
const Gender = styled.div`
  ${tw`mr-3`}
`;
const DogYear = styled.div`
  ${tw`flex flex-row`}
`;
const Birthday = styled.div`
  ${tw``}
`;
const Age = styled.div`
  ${tw``}
`;
const DogInfo = styled.div`
  ${tw`flex flex-row`}
`;
const Breed = styled.div`
  ${tw`mr-3`}
`;

const DogCard = ({ id, name, image, gender, breed, birthdate }) => {
  //   const [modalIsOpen, setIsOpen] = useState(false);

  //   const [addCommentMutation] = useMutation(ADD_COMMENT, {
  //     variables: {
  //       postId: id,
  //       text: comment.value,
  //     },
  //     refetchQueries: () => [{ query: VIEW_POST, variables: { id } }],
  //   });

  //   const openModal = () => {
  //     setIsOpen(true);
  //   };

  //   const closeModal = () => {
  //     setIsOpen(false);
  //   };

  //   const handleAddComment = async () => {
  //     if (comment.value === "") {
  //       return;
  //     }

  //     try {
  //       await addCommentMutation();
  //     } catch (error) {
  //       toast.error("コメント作成に失敗しました。もう一度試してください。");
  //     } finally {
  //       comment.setValue("");
  //     }
  //   };

  return (
    <Container>
      <DogImage src={image} />
      <InfoContainer>
        <DogHeader>
          <Name>{name}</Name>
          <Gender>
            {gender === "male" ? <span>&#9794;</span> : <span>&#9792;</span>}
          </Gender>
        </DogHeader>
        <DogYear>
          <Birthday>{moment(birthdate).format("ll")}</Birthday>
          <Age>{moment().diff(birthdate, "years")} 歳</Age>
        </DogYear>
        <DogInfo>
          <Breed>{breed}</Breed>
        </DogInfo>
      </InfoContainer>
    </Container>

    //   {/* <PostModal
    //     id={id}
    //     user={user}
    //     location={location}
    //     caption={caption}
    //     files={files}
    //     comments={comments}
    //     newComment={comment}
    //     handleAddComment={handleAddComment}
    //     modalIsOpen={modalIsOpen}
    //     closeModal={closeModal}
    //   /> */}
  );
};

export default DogCard;
