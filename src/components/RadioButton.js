import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`w-full flex items-center mb-5`}
`;

const ButtonContainer = styled.div`
  ${tw`w-1/2 flex items-center rounded-full justify-around border py-2 px-2 cursor-pointer relative`};
  background-color: ${({ gender, item }) =>
    gender === item ? "#FED771" : "#ffffff"};
  &:first-child {
    ${tw`mr-5`};
  }
`;

const Text = styled.span`
  font-weight: ${({ gender, item }) => (gender === item ? "bold" : "normal")};
  color: ${({ gender, item }) =>
    gender === item ? "#ffffff" : "#4a5568"};
`;

export default ({ prop, gender, setGender, name, onChange, value }) => (
  <Container>
    {prop.map((item) => {
      return (
        <ButtonContainer
          key={item.key}
          item={item.key}
          gender={gender}
          onClick={() => {
            setGender(item.key);
          }}
        >
          <input className="w-full h-full rounded-full cursor-pointer" style={{ position: "absolute", opacity: 0 }} type="radio" name={name} onChange={onChange} value={item.key} />
          {item.key === "male" && <svg className={gender === "male" ? "fill-white" : "fill-gray"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 2v2h3.586l-3.972 3.972c-1.54-1.231-3.489-1.972-5.614-1.972-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.125-.741-4.074-1.972-5.614l3.972-3.972v3.586h2v-7h-7zm-6 20c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>}
          {item.key === "female" && <svg className={gender === "female" ? "fill-white" : "fill-gray"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.632 3.501 8.443 8 8.941v2.059h-3v2h3v2h2v-2h3v-2h-3v-2.059c4.499-.498 8-4.309 8-8.941zm-16 0c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z"/></svg>}
          <Text item={item.key} gender={gender}>
            {item.text}
          </Text>
        </ButtonContainer>
      );
    })}
  </Container>
);
