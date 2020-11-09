import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import Modal from "react-modal";
import { Calendar } from "react-feather";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useScrollBodyLock } from "../../hooks/useScrollBodyLock";
import { MODIFY_DOG, VIEW_USER } from "../../queries/Main/MainQueries";
import Field from "../Field";
import Button from "../Button";
import RadioButton from "../RadioButton";
import DatePicker from "../DatePicker";
import Switch from "../Switch";
import { QRCode } from "react-qrcode-logo";

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  ${tw`h-full p-3 flex flex-col md:flex-row items-center`}
`;

const ControlContainer = styled.div`
  ${tw`w-full md:w-1/2 p-3 flex flex-col items-center justify-center`}
`;

const ButtonContainer = styled.div`
  ${tw`w-full flex items-center justify-center`}
`

const QRCodeContainer = styled.div`
  ${tw`w-full flex flex-col items-center justify-center`}
`

const LinkContainer = styled.div`
  ${tw`w-full flex items-center justify-center`}
`

const StatusContainer = styled.div`
  ${tw`w-full md:w-1/2 px-3`}
`;

const DogContainer = styled.div`
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

export default ({
  currentUser,
  dogId,
  image: imageP,
  name: nameP,
  gender: genderP,
  breed: breedP,
  birthdate: birthdateP,
  isMissed: isMissedP,
  modalIsOpen,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [avatar, setAvatar] = useState(
    imageP || "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [image, setImage] = useState();
  const [name] = useState(nameP);
  const [gender, setGender] = useState(genderP);
  const [birthdate, setBirthdate] = useState(birthdateP);
  const [breed] = useState(breedP);
  const [isMissed, setIsMissed] = useState(isMissedP);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);

  const code = useRef(null);

  const downloadCode = () => {
    const link = document.createElement("a");
    link.download = "test.png";
    link.href = code.current.canvas.current.toDataURL();
    link.click();
  }
  
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-4/5 md:w-2/3 md:h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalContainer className="w-full flex flex-col items-center justify-center">
        <ControlContainer>
          <ButtonContainer>
            <div>
                迷子状態
            </div>
            <Switch
              isOn={isMissed}
              onColor="#EF476F"
              handleToggle={() => setIsMissed(!isMissed)}
            />
            <div>
              {isMissed ? "on" : "off"}
            </div>
          </ButtonContainer>
          <QRCodeContainer>
            <QRCode ref={code} value="https://google.com" />
            <Button title="QRコードダウンロード" onClick={downloadCode} />
          </QRCodeContainer>
          <LinkContainer>
            <Button title="犬の迷子状況ページへ" accent={true} onClick={downloadCode} />
          </LinkContainer>
        </ControlContainer>
        <StatusContainer>
          <DogContainer>
            <DogImage src={avatar} />
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
          </DogContainer>
        </StatusContainer>
      </ModalContainer>
    </Modal>
  );
};