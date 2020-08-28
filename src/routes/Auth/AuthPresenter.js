import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Container = styled.div`
  ${tw`flex w-full h-screen bg-primary-light`}
`;

const SlideContainer = styled.div`
  ${tw`md:w-full md:h-full md:bg-primary-light`}
`;

const ActionContainer = styled.div`
  ${tw`w-full h-full bg-primary-light p-16`}
`;

const FormContainer = styled.div`
  ${tw`flex flex-col bg-white w-full h-full rounded-lg`}
`;

const LogoContainer = styled.div`
  ${tw`flex flex-none justify-center items-center rounded-t-lg my-16`}
`;

const Logo = styled.img`
  ${tw`w-12 h-12`}
`;

const InputContainter = styled.div`
  ${tw`flex flex-1 px-10 items-center`}
`;

const ActionTabContainer = styled.div`
  ${tw`flex flex-row h-16`}
`;

const ActionTab = styled.div`
  ${tw`flex flex-1 justify-center items-center cursor-pointer`}
`;

const Footer = styled.div`
  ${tw`flex h-8 justify-center items-center bg-secondary-light rounded-b-lg`}
`;

const Copyright = styled.span`
  ${tw`text-sm text-gray-600`}
`;

const AuthPresenter = ({ action, handleAction }) => {
  return (
    <Container>
      <SlideContainer>
        <AutoplaySlider
          className="awssld aws-btn w-full h-full"
          play={true}
          interval={6000}
          bullets={false}
          organicArrows={false}
        >
          <div data-src={require("../../assets/images/main1.jpg")} />
          <div data-src={require("../../assets/images/main2.jpg")} />
          <div data-src={require("../../assets/images/main3.jpg")} />
        </AutoplaySlider>
      </SlideContainer>
      <ActionContainer>
        <FormContainer>
          <LogoContainer>
            <Logo src={require("../../assets/images/logo.png")} />
          </LogoContainer>
          <ActionTabContainer>
            <ActionTab
              className={
                action === "logIn"
                  ? "bg-secondary-light text-white"
                  : "bg-gray-100 text-gray-900"
              }
              onClick={handleAction}
            >
              <div>ログイン</div>
            </ActionTab>
            <ActionTab
              className={
                action === "signIn"
                  ? "bg-secondary-light text-white"
                  : "bg-gray-100 text-gray-900"
              }
              onClick={handleAction}
            >
              <div>会員登録</div>
            </ActionTab>
          </ActionTabContainer>
          <InputContainter>
            {action === "logIn" ? <SignInForm /> : <SignUpForm />}
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
