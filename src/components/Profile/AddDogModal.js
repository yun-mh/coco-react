import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Plus } from "react-feather";
import Modal from "react-modal";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useScrollBodyLock } from "../../hooks/useScrollBodyLock";
import { ADD_DOG, VIEW_USER } from "../../queries/Main/MainQueries";
import Field from "../Field";
import Button from "../Button";
import RadioButton from "../RadioButton";
import DatePicker from "../DatePicker";

Modal.setAppElement("#root");

const ModalContainer = styled.form`
  ${tw`h-full p-3 flex flex-col md:flex-row items-center`}
`;

const ImageContainer = styled.div`
  ${tw`w-full md:w-1/2 p-3 flex items-center justify-center`}
`;

const Image = styled.img`
  ${tw`w-64 h-64 rounded-full object-cover`}
  position: absolute;
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const ContentContainer = styled.div`
  ${tw`w-full md:w-1/2 px-3`}
`;

const Label = styled.label`
  ${tw`ml-3 text-sm text-gray-800 font-semibold text-gray-500`}
`;

export default ({
  currentUser,
  modalIsOpen,
  closeModal,
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [avatar, setAvatar] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [birthdate, setBirthdate] = useState(new Date());
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

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
    const file = inputEl.current.files[0];
    if (file) {
      setImage(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "犬の名前を入力してください。";
    }
    if (!values.breed) {
      errors.breed = "犬種を入力してください。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (formik.values.name !== "" && formik.values.breed !== "") {
      setLoading(true);

      let location = "";
      if (image !== undefined) {
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
        location = locations[0];
      }

      try {
        const {
          data: { registerDog },
        } = await dogRegisterMutation({
          variables: {
            image: location !== "" ? location : avatar,
            name: formik.values.name,
            breed: formik.values.breed,
            gender: formik.values.gender,
            birthdate: formik.values.birthdate,
          },
        });
        if (registerDog) {
          setAvatar("https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg");
          closeModal();
          toast.success("😄 犬を登録しました！");
        }
      } catch (e) {
        toast.error(`😢 ${e.message}`);
      } finally {
        formik.values.image = "";
        formik.values.name = "";
        formik.values.gender = "";
        formik.values.birthdate = "";
        formik.values.breed = "";
        setName("");
        setGender("male");
        setBirthdate(new Date());
        setBreed("");
        setImage("");
        setLoading(false);
      }
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
  
  useEffect(() => {
    formik.values.birthdate = birthdate;
  }, [birthdate, formik.values.birthdate])

  const radioProps = [
    { key: "male", text: "男" },
    { key: "female", text: "女" },
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
          <Image src={avatar} />
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
              <Field
                label="犬種"
                type="text"
                name="breed"
                errors={formik.errors.breed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breed}
                placeholder="犬種"
              />
              <Label>性別</Label>
              <RadioButton name="gender" prop={radioProps} gender={gender} setGender={setGender} onChange={formik.handleChange} value={formik.values.gender} />
              
              <Label>生年月日</Label>
              <DatePicker name="birthdate" birthdate={birthdate} setBirthdate={setBirthdate} open={isDateModalVisible} toggleOpen={setIsDateModalVisible} />
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
