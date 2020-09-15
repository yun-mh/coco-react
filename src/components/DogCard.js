import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import { Calendar } from "react-feather";

const Container = styled.div`
  ${tw`w-3/4 h-24 md:h-32 px-4 py-2 flex flex-col md:flex-row items-center bg-white rounded-lg`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col invisible md:visible`}
`;
const DogImage = styled.img`
  ${tw`w-20 h-20 rounded-lg mr-2`}
`;
const DogHeader = styled.div`
  ${tw`flex flex-row`}
`;
const Name = styled.div`
  ${tw`mr-3`}
`;
const Gender = styled.div`
  ${tw`mr-3`}
`;
const DogYear = styled.div`
  ${tw`flex flex-row`}
`;
const Birthday = styled.div`
  ${tw`flex flex-row text-sm items-center text-gray-500`}
`;
const Age = styled.div`
  ${tw`text-sm text-gray-500`}
`;
const DogInfo = styled.div`
  ${tw`flex flex-row`}
`;
const Breed = styled.div`
  ${tw`mr-3 text-sm text-gray-500`}
`;

const DogCard = ({ id, name, image, gender, breed, birthdate }) => {
  return (
    <Container>
      <DogImage src={image} />
      <InfoContainer>
        <DogHeader>
          <Name>{name}</Name>
          <Gender>
            {gender === "male" ? (
              <span className="text-blue-500 text-sm">&#9794;</span>
            ) : (
              <span className="text-red-400 text-sm">&#9792;</span>
            )}
          </Gender>
        </DogHeader>
        <DogYear>
          <Birthday>
            <Calendar size={14} className="mr-1" />
            {moment(birthdate).format("ll")}
          </Birthday>
          <Age>({moment().diff(birthdate, "years")}歳)</Age>
        </DogYear>
        <DogInfo>
          <Breed>{breed}</Breed>
        </DogInfo>
      </InfoContainer>
    </Container>
  );
};

export default DogCard;