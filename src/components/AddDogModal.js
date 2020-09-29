import React, { useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Plus } from "react-feather";
import moment from "moment";
import Modal from "react-modal";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Field from "./Field";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { ADD_DOG, VIEW_USER } from "../queries/Main/MainQueries";
import RadioButton from "./RadioButton";

Modal.setAppElement("#root");

const ModalContainer = styled.form`
  ${tw`h-full p-3 flex flex-col md:flex-row items-center`}
`;

const ImageContainer = styled.div`
  ${tw`w-full md:w-1/2 p-3 flex items-center justify-center`}
`;

const AvatarContainer = styled.div`
  ${tw`cursor-pointer w-48 h-48 rounded-full flex items-center justify-center relative`}
`;

const Image = styled.img`
  ${tw`w-64 h-64 rounded-full`}
  position: absolute;
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const ContentContainer = styled.div`
  ${tw`w-full md:w-1/2 px-3`}
`;

export default ({
  currentUser,
  location,
  caption,
  files,
  comments,
  newComment,
  handleAddComment,
  modalIsOpen,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [image, setImage] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const [dogRegisterMutation] = useMutation(ADD_DOG, {
    variables: {
      image,
      name,
      breed,
      gender,
      birthdate,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const inputEl = useRef(null);

  const handlePickImage = () => {
    // const file = inputEl.current.files[0];
    // if (file) {
    //   setImage(file);
    //   setAvatar(URL.createObjectURL(file));
    // }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.email = "ユーザ名を入力してください。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (formik.values.username !== "") {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", image);
      const {
        data: { locations },
      } = await axios.post(
        "https://api-coco.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      let location = locations[0];

      // try {
      //   const {
      //     data: { editUser },
      //   } = await editUserMutation({
      //     variables: {
      //       avatar: location !== "" ? location : avatar,
      //       username: formik.values.username,
      //     },
      //   });
      //   if (editUser) {
      //     toast.success("😄 会員情報を変更しました！");
      //   }
      // } catch (e) {
      //   toast.error(`😢 ${e.message}`);
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  const formik = useFormik({
    initialValues: {
      image,
      name,
      gender,
      birthdate,
      breed,
    },
    validate,
    onSubmit: onSubmit,
  });

  const radioProps = [
    { key: "male", ios: "ios-male", md: "md-male", text: "男" },
    { key: "female", ios: "ios-female", md: "md-female", text: "女" },
  ];

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
      <ModalContainer
        className="w-full flex flex-col items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <ImageContainer>
          <Image src={image} />
          <Plus size={40} className="absolute" />
          <input
            ref={inputEl}
            className="opacity-0 w-48 h-48 cursor-pointer rounded-full"
            type="file"
            accept="image/*"
            onChange={(e) => {
              handlePickImage(e);
            }}
          />
        </ImageContainer>
        <ContentContainer>
          <div className="mx-10">
            <InputContainer>
              <Field
                label="犬名"
                type="text"
                name="name"
                errors={formik.errors.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="犬名"
              />
              <RadioButton />
              <Field
                label="犬種"
                type="text"
                name="breed"
                errors={formik.errors.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="犬種"
              />
            </InputContainer>
            <Button
              type="submit"
              title={"登録"}
              accent={true}
              loading={loading}
            />
          </div>
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};
