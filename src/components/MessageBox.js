import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import utils from "../utils";

const Container = styled.div`
  ${tw`w-full flex flex-row items-start justify-start px-5 my-3`}
`;

const Avatar = styled.img`
  ${tw`w-12 h-12 rounded-full mr-5`}
`;

const ContentContainer = styled.div`
  ${tw`w-full flex flex-row items-end`};
  ${({ isMyself }) => (isMyself ? tw`justify-end` : tw`justify-start`)};
`;

const MessageContainer = styled.div`
  ${tw`max-w-1/2 rounded-lg p-3`};
  ${({ isMyself }) =>
    isMyself ? tw`ml-3 bg-secondary-light` : tw`mr-3 bg-white`};
`;

const Message = styled.p``;

const Time = styled.span`
  ${tw`text-sm mb-3`}
`;

export default ({ message, isMyself }) => {
  const { from, text, createdAt } = message;
  const time = utils.formatTime(createdAt);

  return (
    <Container>
      {!isMyself ? <Avatar src={from.avatar} /> : null}
      <ContentContainer isMyself={isMyself}>
        {isMyself ? <Time>{time}</Time> : null}
        <MessageContainer isMyself={isMyself}>
          <Message isMyself={isMyself}>{text}</Message>
        </MessageContainer>
        {!isMyself ? <Time>{time}</Time> : null}
      </ContentContainer>
    </Container>
  );
};
