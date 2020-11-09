import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { CREATE_CHATROOM, VIEW_CHATROOMS } from "../../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`p-1 flex-none`};
`;

const TouchableContainer = styled.div`
  ${tw`p-1 flex flex-col items-center cursor-pointer`};
`;

const Avatar = styled.img`
  ${tw`w-12 h-12 rounded-full object-cover`};
`;

const Username = styled.span`
  ${tw`text-xs`};
`;

const Friend = ({ id, avatar, username, currentUser, toChatroom }) => {
  const [createChatRoomMutation] = useMutation(CREATE_CHATROOM, {
    variables: {
      toId: id,
    },
    refetchQueries: () => [
      { query: VIEW_CHATROOMS, variables: { id: currentUser } },
    ],
  });

  const createChatroom = async () => {
    try {
      const {
        data: {
          createChatRoom,
        },
      } = await createChatRoomMutation();
      if (createChatRoom) {
        toChatroom(createChatRoom.id, createChatRoom);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container>
      <TouchableContainer onClick={createChatroom}>
        <Avatar src={avatar} />
        <Username>{username}</Username>
      </TouchableContainer>
    </Container>
  );
};

export default Friend;
