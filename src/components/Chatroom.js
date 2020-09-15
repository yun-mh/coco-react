import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import styled from "styled-components";
import tw from "twin.macro";
import { Send } from "react-feather";
import TextareaAutosize from "react-autosize-textarea";
import ScrollToBottom from "react-scroll-to-bottom";
import Loader from "./Loader";
import MessageBox from "./MessageBox";
import {
  GET_MESSAGE,
  SEND_MESSAGE,
  VIEW_CHATROOM,
} from "../queries/Main/MainQueries";
import useInput from "../hooks/useInput";

const Container = styled.div`
  ${tw`h-entire relative bg-primary-light`};
`;

const ChatHeader = styled.div`
  ${tw`w-full bg-white h-16 flex flex-row p-2 justify-center items-center font-semibold`};
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center h-chat`}
`;

const ChatContainer = styled(ScrollToBottom)`
  ${tw`flex h-chat`};
`;

const MessageInputContainer = styled.div`
  ${tw`w-full absolute bg-white bottom-0 h-16 flex flex-row p-2 items-center`};
`;

export default ({ id, counterpart, currentUser }) => {
  const [messages, setMessages] = useState([]);

  const msg = useInput("");

  const { data: newData } = useSubscription(GET_MESSAGE, {
    variables: { roomId: id },
  });

  const { loading, data } = useQuery(VIEW_CHATROOM, {
    variables: { id: id },
  });

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: id,
      message: msg.value,
      toId: counterpart.id,
    },
    refetchQueries: () => [{ query: VIEW_CHATROOM, variables: { id: id } }],
  });

  useEffect(() => {
    if (!loading) {
      const {
        viewChatRoom: { messages },
      } = data;
      setMessages(messages);
    }
  }, [loading, data]);

  const handleNewMessage = () => {
    if (newData !== undefined) {
      const { getMessage } = newData;
      setMessages((prev) => [...prev, getMessage]);
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, [newData]);

  const handleSendMessage = async () => {
    try {
      await sendMessageMutation();
    } catch (error) {
      console.warn(error);
    } finally {
      msg.setValue("");
    }
  };

  return (
    <Container>
      <ChatHeader>{counterpart.username}</ChatHeader>
      <ChatContainer>
        {loading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <div>
            {messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message}
                isMyself={message.from.id === currentUser ? true : false}
              />
            ))}
          </div>
        )}
      </ChatContainer>
      <MessageInputContainer>
        <TextareaAutosize
          className="h-10 w-full border px-3 py-1 mr-3 flex justify-center"
          maxRows={2}
          value={msg.value}
          onChange={msg.onChange}
          placeholder="コメント入力"
          async={true}
        />
        {msg !== "" && (
          <button className="focus:outline-none" onClick={handleSendMessage}>
            <Send className="text-gray-600" />
          </button>
        )}
      </MessageInputContainer>
    </Container>
  );
};
