import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import { Calendar, MoreHorizontal } from "react-feather";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { DELETE_DOG, VIEW_USER } from "../../queries/Main/MainQueries";
import ModifyDogModal from "./ModifyDogModal";
import "react-tippy/dist/tippy.css";
import SetDogLostModal from "./SetDogLostModal";

const Container = styled.div`
  ${tw`w-full lg:w-3/4 h-24 md:h-32 px-4 py-2 my-2 flex items-center justify-between bg-white rounded-lg shadow`}
`;

const DogImage = styled.img`
  ${tw`block w-10 h-10 lg:w-20 lg:h-20 rounded-lg object-cover`}
`;
const InfoContainer = styled.div`
  ${tw`flex flex-col text-xs`}
`;
const DogHeader = styled.div`
  ${tw`flex flex-row`}
`;
const Name = styled.div`
  ${tw`mr-3 lg:text-sm`}
`;
const Gender = styled.div`
  ${tw`mr-3`}
`;
const DogYear = styled.div`
  ${tw`flex flex-row`}
`;
const Birthday = styled.div`
  ${tw`flex flex-row lg:text-sm items-center text-gray-500`}
`;
const Age = styled.div`
  ${tw`lg:text-sm text-gray-500`}
`;
const DogInfo = styled.div`
  ${tw`flex flex-row`}
`;
const Breed = styled.div`
  ${tw`mr-3 lg:text-sm text-gray-500`}
`;

const DogCard = ({
  id,
  name,
  image,
  gender,
  breed,
  birthdate,
  isMissed,
  currentUser,
  isMyself,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modifyModalIsOpen, setModifyIsOpen] = useState(false);
  const [dogLostModalIsOpen, setDogLostIsOpen] = useState(false);

  const [deleteDogMutation] = useMutation(DELETE_DOG, {
    variables: {
      id,
      action: "DELETE",
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const openModifyModal = () => {
    setModifyIsOpen(true);
  };

  const closeModifyModal = () => {
    setModifyIsOpen(false);
  };

  const openSetLostModal = () => {
    setDogLostIsOpen(true);
  };

  const closeSetLostModal = () => {
    setDogLostIsOpen(false);
  };

  const deleteDog = async (id) => {
    try {
      const {
        data: { editDog },
      } = await deleteDogMutation();
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
      {isMyself ? (
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
                    openModifyModal();
                  }, 300);
                }}
              >
                修正
              </li>
              <li
                className="mb-3 text-center cursor-pointer"
                onClick={() => {
                  setIsPopoverOpen(false);
                  setTimeout(() => {
                    openSetLostModal();
                  }, 300);
                }}
              >
                迷子設定
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
          <MoreHorizontal
            className="w-4 h-4 lg:w-6 lg:h-6 text-gray-600 cursor-pointer"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          />
        </Tooltip>
      ) : (
        <MoreHorizontal className="w-4 h-4 lg:w-6 lg:h-6 invisible" />
      )}
      <ModifyDogModal
        currentUser={currentUser}
        dogId={id}
        image={image}
        name={name}
        gender={gender}
        breed={breed}
        birthdate={birthdate}
        modalIsOpen={modifyModalIsOpen}
        closeModal={closeModifyModal}
      />
      <SetDogLostModal
        currentUser={currentUser}
        dogId={id}
        image={image}
        name={name}
        gender={gender}
        breed={breed}
        birthdate={birthdate}
        isMissed={isMissed}
        modalIsOpen={dogLostModalIsOpen}
        closeModal={closeSetLostModal}
      />
    </Container>
  );
};

export default DogCard;
