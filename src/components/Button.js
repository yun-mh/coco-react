import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ButtonLoader from "./ButtonLoader";

const Container = styled.div`
  ${tw`flex flex-col w-full my-3`}
`;

const Btn = styled.button`
  ${tw`px-5 h-12 rounded-full focus:outline-none active:bg-primary-light flex items-center justify-center`}
`;

const Button = ({ loading, type, title, accent = false, onClick }) => {
  return (
    <Container>
      <Btn
        type={type}
        onClick={onClick}
        className={accent ? "bg-primary" : "border border-gray-600"}
      >
        {loading ? (
          <ButtonLoader />
        ) : (
          <span className={accent ? "text-white" : "text-gray-600"}>
            {title}
          </span>
        )}
      </Btn>
    </Container>
  );
};

export default Button;
