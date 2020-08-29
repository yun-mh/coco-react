import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-row justify-center items-center`}
`;

const Text = styled.div`
  ${tw`text-sm text-gray-500`}
`;

const Button = styled.div`
  ${tw`font-bold ml-2 text-sm text-primary hover:cursor-pointer`}
`;

const TextButton = ({ text, title, handleClick }) => {
  return (
    <Container>
      <Text>{text}</Text>
      <Button onClick={handleClick}>{title}</Button>
    </Container>
  );
};

export default TextButton;
