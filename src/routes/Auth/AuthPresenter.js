import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";

const Container = styled.div`
  ${tw`flex w-full h-screen bg-primary-light`}
`;

const ImageContainer = styled.div`
  ${tw`flex hidden md:block md:w-2/3 md:h-full bg-cover`}
  background-image: url(${require("../../assets/images/main.jpg")});
  background-position: center top;
  box-shadow: inset 0 0 0 2000px rgba(187, 227, 222, 0.85);
`;

const ActionContainer = styled.div`
  ${tw`flex flex-1 w-full h-full bg-primary-light`}
`;

const FormContainer = styled.div`
  ${tw`flex flex-col bg-white w-full h-full`}
`;

const LogoContainer = styled.div`
  ${tw`flex flex-col flex-none justify-center items-center my-12`}
`;

const Logo = styled.img`
  ${tw`w-12 h-12 m-1`}
`;

const Title = styled.img`
  ${tw`h-5`}
`;

const InputContainter = styled.div`
  ${tw`flex flex-1 px-10 items-center`}
`;

const ActionTabContainer = styled.div`
  ${tw`flex flex-row h-12`}
`;

const ActionTab = styled.div`
  ${tw`flex flex-1 justify-center items-center cursor-pointer`}
`;

const Footer = styled.div`
  ${tw`flex h-8 justify-center items-center bg-secondary-light`}
`;

const Copyright = styled.span`
  ${tw`text-xs text-gray-600`}
`;

const AuthPresenter = ({ action, handleAction }) => {
  return (
    <Container>
      <ImageContainer></ImageContainer>
      <ActionContainer>
        <FormContainer>
          <LogoContainer>
            <Logo src={require("../../assets/images/logo.png")} />
            <Title src={require("../../assets/images/title.png")} />
          </LogoContainer>
          <ActionTabContainer>
            <ActionTab
              className={
                action === "logIn"
                  ? "bg-secondary-light text-gray-900"
                  : "bg-gray-100 text-gray-400"
              }
              onClick={handleAction}
            >
              <div>ログイン</div>
            </ActionTab>
            <ActionTab
              className={
                action === "signIn"
                  ? "bg-secondary-light text-gray-900"
                  : "bg-gray-100 text-gray-400"
              }
              onClick={handleAction}
            >
              <div>会員登録</div>
            </ActionTab>
          </ActionTabContainer>
          <InputContainter>
            {action === "logIn" ? (
              <SignInForm action={action} />
            ) : (
              <SignUpForm action={action} />
            )}
          </InputContainter>
          <Footer>
            <Copyright>© 2020 Minho Yun</Copyright>
          </Footer>
        </FormContainer>
      </ActionContainer>
    </Container>
  );
};

export default AuthPresenter;
