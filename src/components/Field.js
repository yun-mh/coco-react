import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col w-full`}
`;

const Label = styled.label`
  ${tw`ml-3 text-sm text-gray-800 font-semibold text-gray-500`}
`;

const Input = styled.input`
  ${tw`border border-gray-400 px-5 py-1 rounded-full focus:outline-none focus:border-primary`}
`;

const Error = styled.div`
  ${tw`ml-3 text-xs text-red-500 h-6`}
`;

const Field = ({ label, type, name, errors, onChange, value }) => {
  return (
    <>
      <Container>
        <Label>{label}</Label>
        <Input type={type} name={name} onChange={onChange} value={value} />
      </Container>
      <Error>{errors}</Error>
    </>
  );
};

export default Field;
