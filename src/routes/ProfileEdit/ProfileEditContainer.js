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
  history,
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
    } else if (values.username.length > 10) {
      errors.username = "ユーザ名は10文字以内に設定してください。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (formik.values.username !== "") {
      setLoading(true);

      if (image === undefined && username === formik.values.username) {
        setLoading(false);
        history.push({ pathname: `/${formik.values.username}`, state: { id } });
        return;
      }

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
          data: { editUser },
        } = await editUserMutation({
          variables: {
            avatar: location !== "" ? location : avatar,
            username: formik.values.username,
          },
        });
        if (editUser) {
          toast.success("😄 会員情報を変更しました！");
          history.push({
            pathname: `/${formik.values.username}`,
            state: { id },
          });
        }
      } catch (e) {
        toast.error(`😢 ${e.message}`);
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
