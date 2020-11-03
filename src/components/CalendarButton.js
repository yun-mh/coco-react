import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col w-full`}
`;

const Btn = styled.button`
  ${tw`px-5 py-1 rounded-full focus:outline-none active:bg-secondary-light flex items-center justify-center`}
`;

const Button = ({ loading, type, title, accent = false, onClick }) => {
  return (
    <Container>
      <Btn
        type={type}
        onClick={onClick}
        className={accent ? "bg-primary" : "border border-gray-400"}
      >
        <span className={accent ? "text-white" : "text-gray-600"}>
            {title}
        </span>
      </Btn>
    </Container>
  );
};

export default Button;
