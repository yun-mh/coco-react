import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Heart, MessageSquare } from "react-feather";

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

const PostCard = ({ likeCount, commentCount, file }) => (
  <Container bg={file.url}>
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
);

export default PostCard;
