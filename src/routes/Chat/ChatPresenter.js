import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import Loader from "../../components/Loader";

const Container = styled.div`
  ${tw`bg-white rounded-lg`}
`;

const LoaderContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const ChatPresenter = ({ loading, data }) => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  } else {
    return (
      <Container>
        <Helmet>
          <title> | ココ</title>
        </Helmet>
      </Container>
    );
  }
};

export default ChatPresenter;
