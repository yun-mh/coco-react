import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";
import Friend from "../../components/Message/Friend";
import ChatListItem from "../../components/Message/ChatListItem";
import Chatroom from "../../components/Message/Chatroom";
import { Send } from "react-feather";

const Container = styled.div`
  ${tw`flex flex-col sm:flex-row w-full h-mentire sm:h-entire`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const ChatBar = styled.div`
  ${tw`flex w-full sm:w-2/5 flex-col bg-white h-half mb-3 sm:mb-0 sm:h-full rounded-lg shadow`}
`;

const FriendsContainer = styled.div`
  ${tw`flex flex-row h-16 sm:h-32 px-2 items-center border-b overflow-x-auto px-3`}
`;

const ChatroomsContainer = styled.div`
  ${tw`flex flex-col overflow-y-auto`}
`;

const ChatContainer = styled.div`
  ${tw`flex w-full sm:w-3/5 flex-col h-full sm:ml-10 rounded-lg bg-white shadow`}
`;

const ExplanationContainer = styled.div`
  ${tw`w-full h-full flex flex-col items-center justify-center`}
`;

const IconContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;

const Explanation = styled.p`
  ${tw`text-sm sm:text-base font-semibold mt-5 mx-5 text-gray-700`}
`;

const ChatPresenter = ({ loading, rooms, friends, currentUser }) => {
  const [room, setRoom] = useState();
  const [selected, setSelected] = useState();
  const [counterpart, setCounterpart] = useState();

  const toChatroom = (roomId, chatroom = {}) => {
    let target = rooms.filter((room) => room.id === roomId)[0];
    if (target === undefined) {
      target = chatroom;
    }
    const counter = target.participants.filter(
      (person) => person.id !== currentUser
    )[0];
    setCounterpart(counter);
    setRoom(target);
    setSelected(target.id);
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>メッセージ | ココ</title>
        </Helmet>
        <Container>
          <ChatBar>
            <FriendsContainer>
              {friends &&
                friends.map((friend) => (
                  <Friend
                    key={friend.id}
                    id={friend.id}
                    avatar={friend.avatar}
                    username={friend.username}
                    currentUser={currentUser}
                    toChatroom={toChatroom}
                  />
                ))}
            </FriendsContainer>
            <ChatroomsContainer>
              {rooms &&
                rooms.map((room) => (
                  <ChatListItem
                    key={room.id}
                    id={room.id}
                    messages={room.messages}
                    participants={room.participants}
                    currentUser={currentUser}
                    toChatroom={() => toChatroom(room.id)}
                    selected={selected === room.id ? true : false}
                  />
                ))}
            </ChatroomsContainer>
          </ChatBar>
          <ChatContainer>
            {room ? (
              <Chatroom
                key={room.id}
                id={room.id}
                counterpart={counterpart}
                currentUser={currentUser}
              />
            ) : (
              <ExplanationContainer>
                <IconContainer>
                  <Send className="w-12 h-12 sm:w-20 sm:h-20 text-gray-400" />
                </IconContainer>
                <Explanation>友達にメッセージを送りましょう！</Explanation>
              </ExplanationContainer>
            )}
          </ChatContainer>
        </Container>
      </>
    );
  }
};

export default ChatPresenter;
