import React, { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { EDIT_USER, VIEW_USER } from "../../queries/Main/MainQueries";
import ProfileEditPresenter from "./ProfileEditPresenter";

const ProfileEditContainer = ({
  location: {
    state: { id, username, email, avatar },
  },
}) => {
  const [avatarS, setAvatar] = useState(
    avatar ||
      "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg"
  );
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const inputEl = useRef(null);

  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username,
    },
    refetchQueries: () => [{ query: VIEW_USER, variables: { id: id } }],
  });

  const handlePickAvatar = () => {
    const file = inputEl.current.files[0];
    if (file) {
      setImage(file);
      setAvatar(URL.createObjectURL(file));
    }
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
      console.log(formData);
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

      try {
        const {
          data: { editUser },
        } = await editUserMutation({
          variables: {
            avatar: location !== "" ? location : avatar,
            username: formik.values.username,
          },
        });
        if (editUser) {
          toast.success("😄 会員情報を変更しました！");
          console.log(editUser);
        }
      } catch (e) {
        toast.error(`😢 ${e.message}`);
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      avatar,
      username,
    },
    validate,
    onSubmit: onSubmit,
  });

  return (
    <ProfileEditPresenter
      loading={loading}
      inputEl={inputEl}
      username={username}
      avatar={avatarS}
      email={email}
      formik={formik}
      handlePickAvatar={handlePickAvatar}
    />
  );
};

export default withRouter(ProfileEditContainer);
