import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import utils from "../../utils";

const Container = styled.div`
  ${tw`flex flex-row w-full border-b border-gray-200 p-3 sm:p-5 items-center justify-between cursor-pointer hover:bg-gray-100`}
  ${({ selected }) => (selected ? tw`bg-gray-100` : tw`bg-white`)}
`;

const UserContainer = styled.div`
  ${tw`flex-1 flex items-center overflow-hidden`}
`;

const Avatar = styled.img`
  ${tw`w-8 h-8 sm:w-12 sm:h-12 rounded-full mr-5 object-cover`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col mr-5`}
`;

const Username = styled.span`
  ${tw`text-sm`}
  font-weight: 500;
`;

const Message = styled.span`
  ${tw`text-gray-700`}
  font-size: 12px;
`;

const Time = styled.span`
  ${tw`text-gray-500`}
  font-size: 10px;
`;

const ChatListItem = ({
  id,
  messages,
  participants,
  currentUser,
  toChatroom,
  selected,
}) => {
  const [msg, setMsg] = useState([]);

  const counterpart = participants.filter(
    (person) => person.id !== currentUser
  )[0];

  useEffect(() => {
    const reversed = messages.concat().sort(utils.compare);
    setMsg([...reversed]);
  }, [messages]);

  return (
    <Container selected={selected} onClick={toChatroom}>
      <UserContainer>
        <Avatar src={counterpart.avatar} />
        <InfoContainer>
          <Username>{counterpart.username}</Username>
          <Message>
            {msg && msg.length > 0
              ? msg[0].text.length > 28
                ? msg[0].text.slice(0, 28) + "..."
                : msg[0].text
              : ""}
          </Message>
        </InfoContainer>
      </UserContainer>
      <Time>{msg && msg.length > 0 && utils.formatDate(msg[0].createdAt)}</Time>
    </Container>
  );
};

export default ChatListItem;
