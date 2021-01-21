import React, { useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import Modal from "react-modal";
import { Calendar, Info, X } from "react-feather";
import { useMutation } from "@apollo/client";
import { QRCode } from "react-qrcode-logo";
import { useScrollBodyLock } from "../../hooks/useScrollBodyLock";
import { TOGGLE_STATUS, VIEW_USER } from "../../queries/Main/MainQueries";
import Button from "../Button";
import Switch from "../Switch";

Modal.setAppElement("#root");

const ModalContainer = styled.div`
  ${tw`mt-12 pb-3 flex flex-col items-center overflow-y-auto`}
  height: calc(100% - 3rem);
`;

const ModalTitle = styled.div`
  ${tw`fixed w-4/5 md:w-1/3 flex items-center justify-center h-12 border-b font-semibold bg-white rounded-t-lg`}
`;

const CloseButton = styled.div`
  ${tw`absolute`}
  right: 10px;
`;

const StatusContainer = styled.div`
  ${tw`w-full px-3`}
`;

const DogContainer = styled.div`
  ${tw`w-full h-24 md:h-32 p-4 flex items-center justify-around border-b`}
`;

const ButtonContainer = styled.div`
  ${tw`w-full flex items-center justify-around py-4 border-b`}
`;

const CodeContainer = styled.div`
  ${tw`w-full h-full flex flex-col items-center justify-center p-3`}
`;

const QRCodeContainer = styled.div`
  ${tw`w-full flex flex-col items-center justify-center`}
`;

const LinkContainer = styled.div`
  ${tw`w-full flex flex-col items-center justify-center mt-5`}
`;

const InfoContainer = styled.div`
  ${tw`flex flex-col text-xs`}
`;
const DogImage = styled.img`
  ${tw`w-10 h-10 sm:w-20 sm:h-20 rounded-lg object-cover`}
`;
const DogHeader = styled.div`
  ${tw`flex flex-row sm:text-sm`}
`;
const Name = styled.div`
  ${tw`mr-3 sm:text-sm`}
`;
const Gender = styled.div`
  ${tw`mr-3 sm:text-sm`}
`;
const DogYear = styled.div`
  ${tw`flex flex-row sm:text-sm`}
`;
const Birthday = styled.div`
  ${tw`flex flex-row sm:text-sm items-center text-gray-500`}
`;
const Age = styled.div`
  ${tw`sm:text-sm text-gray-500`}
`;
const DogInfo = styled.div`
  ${tw`flex flex-row`}
`;
const Breed = styled.div`
  ${tw`mr-3 sm:text-sm text-gray-500`}
`;

export default ({
  currentUser,
  dogId,
  image,
  name,
  gender,
  breed,
  birthdate,
  isMissed: isMissedP,
  modalIsOpen,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [isMissed, setIsMissed] = useState(isMissedP);

  const code = useRef(null);

  const [modifyDogMutation] = useMutation(TOGGLE_STATUS, {
    variables: {
      id: dogId,
      isMissed,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const downloadCode = () => {
    const link = document.createElement("a");
    link.download = "test.png";
    link.href = code.current.canvas.current.toDataURL();
    link.click();
  };

  const openAsNewWindow = () => {
    window.open(
      `https://support.cocofordogs.com/${dogId}?owner=${currentUser}`
    );
  };

  const toggleMissingStatus = async () => {
    const result = window.confirm("本当に犬の迷子状態を変更しますか？");
    if (result) {
      const {
        data: { toggleMissingStatus },
      } = await modifyDogMutation({
        variables: {
          id: dogId,
          isMissed: !isMissed,
        },
      });
      if (toggleMissingStatus) {
        setIsMissed(!isMissed);
      }
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-4/5 md:w-1/3 h-mentire sm:h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalTitle>
        迷子設定
        <CloseButton onClick={() => closeModal()}>
          <X size={30} className="text-gray-600 cursor-pointer" />
        </CloseButton>
      </ModalTitle>
      <ModalContainer>
        <StatusContainer>
          <DogContainer>
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
          </DogContainer>
          <ButtonContainer>
            <div className="text-xs sm:text-sm mr-3">迷子状態に設定する</div>
            <Switch
              isOn={isMissed}
              onColor="#EF476F"
              handleToggle={toggleMissingStatus}
            />
          </ButtonContainer>
        </StatusContainer>
        <CodeContainer>
          <QRCodeContainer>
            <QRCode
              ref={code}
              value={`https://support.cocofordogs.com/${dogId}`}
              quietZone={20}
              logoWidth={40}
              logoHeight={40}
              logoImage={require("../../assets/images/qr-logo.png")}
            />
            <div className="flex justify-center items-center px-5">
              <Info className="w-4 h-4 mr-2 sm:w-8 sm:h-8" />
              <p className="w-3/4 ml-2 text-xs sm:text-sm text-gray-700">
                QRコードをプリントし首輪・ハーネスなどに付着すると、迷子になった際に有用に使えます。
              </p>
            </div>
          </QRCodeContainer>
          <LinkContainer>
            <Button title="QRコードダウンロード" onClick={downloadCode} />
            <Button
              title="犬の迷子状況ページへ"
              accent={true}
              onClick={openAsNewWindow}
            />
          </LinkContainer>
        </CodeContainer>
      </ModalContainer>
    </Modal>
  );
};
