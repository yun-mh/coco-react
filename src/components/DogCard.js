import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import { Calendar, MoreHorizontal } from "react-feather";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { DELETE_DOG, VIEW_USER } from "../queries/Main/MainQueries";
import ModifyDogModal from "./ModifyDogModal";
import "react-tippy/dist/tippy.css";

const Container = styled.div`
  ${tw`w-3/4 h-24 md:h-32 px-4 py-2 my-2 flex flex-col md:flex-row items-center justify-between bg-white rounded-lg`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col invisible md:visible`}
`;
const DogImage = styled.img`
  ${tw`w-20 h-20 rounded-lg object-cover`}
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

const DogCard = ({
  id,
  name,
  image,
  gender,
  breed,
  birthdate,
  currentUser,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [deleteDogMutation] = useMutation(DELETE_DOG, {
    variables: {
      id,
      action: "DELETE",
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteDog = async (id) => {
    try {
      const { data: editDog } = await deleteDogMutation();
      if (editDog) {
        toast.success("👍 削除が完了しました。");
      }
    } catch (e) {
      console.warn(e);
    }
  };

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
      <Tooltip
        interactive
        open={isPopoverOpen}
        onRequestClose={() => setIsPopoverOpen(false)}
        position="bottom"
        trigger="click"
        arrow="true"
        theme="light"
        html={
          <ul className="bg-white flex flex-col px-8 py-3">
            <li
              className="mb-3 text-center cursor-pointer"
              onClick={() => {
                setIsPopoverOpen(false);
                setTimeout(() => {
                  openModal();
                }, 300);
              }}
            >
              修正
            </li>
            <li
              className="text-red-400 text-center cursor-pointer"
              onClick={() => deleteDog(id)}
            >
              削除
            </li>
          </ul>
        }
      >
        <MoreHorizontal className="text-gray-600 cursor-pointer" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
      </Tooltip>
      <ModifyDogModal
        currentUser={currentUser}
        dogId={id}
        image={image}
        name={name}
        gender={gender}
        breed={breed}
        birthdate={birthdate}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </Container>
  );
};

export default DogCard;
