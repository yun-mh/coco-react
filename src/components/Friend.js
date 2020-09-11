import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { CREATE_CHATROOM, VIEW_CHATROOMS } from "../queries/Main/MainQueries";

const Container = styled.div`
  ${tw`p-1`};
`;

const TouchableContainer = styled.div`
  ${tw`p-1 flex flex-col items-center`};
`;

const Avatar = styled.img`
  ${tw`w-12 h-12 rounded-full`};
`;

const Username = styled.span`
  ${tw`text-xs`};
`;

const Friend = ({ id, avatar, username, currentUser }) => {
  const [createChatRoomMutation] = useMutation(CREATE_CHATROOM, {
    variables: {
      toId: id,
    },
    refetchQueries: () => [
      { query: VIEW_CHATROOMS, variables: { id: currentUser } },
    ],
  });

  const toChatroom = async () => {
    try {
      const {
        data: {
          createChatRoom: { id: roomId },
        },
      } = await createChatRoomMutation();

      //   navigation.navigate("Chatroom", {
      //     id: roomId,
      //     counterpartId: id,
      //     counterpartUsername: username,
      //     myself: currentUser,
      //   });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container>
      <TouchableContainer onPress={toChatroom}>
        <Avatar src={avatar} />
        <Username>{username}</Username>
      </TouchableContainer>
    </Container>
  );
};

export default Friend;
