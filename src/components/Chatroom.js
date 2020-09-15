import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import styled from "styled-components";
import Loader from "./Loader";
import MessageBox from "./MessageBox";
import {
  GET_MESSAGE,
  SEND_MESSAGE,
  VIEW_CHATROOM,
} from "../queries/Main/MainQueries";

const Container = styled.div`
  flex: 1;
`;

const ChatContainer = styled.div`
  flex: 1;
`;

const ScrollView = styled.div``;

const MessageInputContainer = styled.div`
  flex-direction: row;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
  border-top-width: 0.5px;
  border-top-color: lightgray;
  border-style: solid;
`;

const MessageInput = styled.textarea`
  flex: 9;
  height: ${({ height }) => height}px;
  min-height: 24px;
  padding-right: 10px;
`;

const MessageAddContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export default ({ id, counterpart, currentUser }) => {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(40);
  const [messages, setMessages] = useState([]);

  const { data: newData } = useSubscription(GET_MESSAGE, {
    variables: { roomId: id },
  });

  const { loading, data } = useQuery(VIEW_CHATROOM, {
    variables: { id: id },
  });

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: id,
      message: text,
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
  }, [data]);

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
      setText("");
    }
  };

  return (
    <Container>
      <ChatContainer>
        {loading ? (
          <div
            style={{
              flex: 1,
              jusfifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </div>
        ) : (
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            {messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message}
                isMyself={message.from.id === currentUser ? true : false}
              />
            ))}
          </ScrollView>
        )}
      </ChatContainer>
      <MessageInputContainer>
        <MessageInput
          placeholder="メッセージを入力"
          value={text}
          onChangeText={(text) => setText(text)}
          editable={true}
          multiline={true}
          height={height}
        />
        <MessageAddContainer>
          {text !== "" ? <div onPress={handleSendMessage}>send</div> : null}
        </MessageAddContainer>
      </MessageInputContainer>
    </Container>
  );
};
