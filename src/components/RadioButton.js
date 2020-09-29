import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw``}
`;

const ButtonContainer = styled.div`
  ${tw``}
`;

const Text = styled.span`
  ${tw``}
`;

export default ({ prop, gender, setGender }) => (
  <Container>
    {prop.map((item) => {
      return (
        <ButtonContainer
          key={item.key}
          item={item.key}
          gender={gender}
          onPress={() => {
            setGender(item.key);
          }}
        >
          {/* <Ionicons
            name={item.md}
            size={24}
            color={gender === item.key ? colors.white : colors.darkGray}
          /> */}
          <Text item={item.key} gender={gender}>
            {item.text}
          </Text>
        </ButtonContainer>
      );
    })}
  </Container>
);
