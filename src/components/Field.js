import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col w-full`}
`;

const Label = styled.label`
  ${tw`text-gray-800 font-semibold text-gray-500 mb-1`}
`;

const Input = styled.input`
  ${tw`border border-primary-light px-5 py-2 rounded-full`}
`;

const Error = styled.div`
  ${tw`text-sm text-red-500 h-8`}
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
