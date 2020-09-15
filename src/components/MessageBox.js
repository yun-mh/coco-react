import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import utils from "../utils";

const Container = styled.div`
  ${tw`flex flex-row items-start justify-start px-5 my-3`}
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ isMyself }) => (isMyself ? "flex-end" : "flex-start")};
`;

const MessageContainer = styled.div`
  border-radius: 10px;
  padding: 10px;
  margin-left: ${({ isMyself }) => (isMyself ? 10 : 0)}px;
  margin-right: ${({ isMyself }) => (isMyself ? 0 : 10)}px;
`;

const Message = styled.p``;

const Time = styled.span`
  font-size: 12px;
  padding-bottom: 5px;
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
