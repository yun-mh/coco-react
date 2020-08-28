import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

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

const Form = styled.form`
  ${tw`flex flex-col bg-white w-full h-full rounded-lg`}
`;

const LogoContainer = styled.div`
  ${tw`flex flex-1 justify-center items-center rounded-t-lg`}
`;

const Logo = styled.img`
  ${tw`w-12 h-12`}
`;

const InputContainter = styled.div`
  ${tw`flex-none bg-red-300`}
`;

const Footer = styled.div`
  ${tw`flex h-8 justify-center items-center bg-secondary-light rounded-b-lg`}
`;

const Copyright = styled.span`
  ${tw`text-sm`}
`;

const AuthPresenter = ({ action }) => {
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
        <Form>
          <LogoContainer>
            <Logo src={require("../../assets/images/logo.png")} />
          </LogoContainer>
          <InputContainter>
            {action === "logIn" ? <div>login</div> : <div>signup</div>}
          </InputContainter>
          <Footer>
            <Copyright>© 2020 Minho Yun</Copyright>
          </Footer>
        </Form>
      </ActionContainer>
    </Container>
  );
};

export default AuthPresenter;
