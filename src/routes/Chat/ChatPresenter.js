import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";
import Friend from "../../components/Friend";

const Container = styled.div`
  ${tw`flex flex-row w-full h-entire`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const ChatBar = styled.div`
  ${tw`flex w-2/5 flex-col bg-white h-full rounded-lg`}
`;

const FriendsContainer = styled.div`
  ${tw`flex flex-row h-24 items-center border-b overflow-x-auto px-3`}
`;

const ChatroomsContainer = styled.div`
  ${tw`flex flex-col overflow-y-auto`}
`;

const ChatContainer = styled.div`
  ${tw`flex w-3/5 flex-col`}
`;

const ChatPresenter = ({
  children,
  loading,
  rooms,
  friendLoading,
  friends,
  currentUser,
}) => {
  console.log(friends);
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
                    id={friend.id}
                    avatar={friend.avatar}
                    username={friend.username}
                    currentUser={currentUser}
                  />
                ))}
            </FriendsContainer>
            <ChatroomsContainer>
              {rooms && rooms.map((room) => <div>{room.id}</div>)}
            </ChatroomsContainer>
          </ChatBar>
          <ChatContainer>{children}</ChatContainer>
          {/* {!loading &&
            notifications &&
            notifications.map((item) => (
              <NotificationCard
                key={item.id}
                id={item.id}
                type={item.type}
                from={item.from}
                cmt={item.comment}
                currentUser={currentUser}
              />
            ))} */}
        </Container>
      </>
    );
  }
};

export default ChatPresenter;
