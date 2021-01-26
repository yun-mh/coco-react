import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import utils from "../../utils";

const Container = styled.div`
  ${tw`w-full flex flex-row items-start justify-start px-2 sm:px-5 my-3`}
`;

const Avatar = styled.img`
  ${tw`w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-5 object-cover`}
`;

const ContentContainer = styled.div`
  ${tw`w-full flex flex-row items-end`};
  ${({ isMyself }) => (isMyself ? tw`justify-end` : tw`justify-start`)};
`;

const MessageContainer = styled.div`
  ${tw`max-w-1/2 rounded-lg p-2 sm:p-3`};
  ${({ isMyself }) =>
    isMyself ? tw`ml-3 bg-secondary-light` : tw`mr-3 bg-white`};
`;

const Message = styled.p`
  ${tw`text-sm sm:text-base`}
`;

const Time = styled.span`
  ${tw`text-gray-700 text-xs sm:text-sm mb-3`}
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
