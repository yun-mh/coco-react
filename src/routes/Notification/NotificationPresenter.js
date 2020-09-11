import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";
import NotificationCard from "../../components/NotificationCard";

const Container = styled.div`
  ${tw``}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const NotificationPresenter = ({ loading, notifications, currentUser }) => {
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
          <title>通知 | ココ</title>
        </Helmet>
        <Container>
          {!loading &&
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
            ))}
        </Container>
      </>
    );
  }
};

export default NotificationPresenter;
