import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import tw from "twin.macro";
import { Plus } from "react-feather";
import Field from "../../components/Field";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const Container = styled.div`
  ${tw`bg-white rounded-lg h-entire flex flex-col items-center justify-center`}
`;

const AvatarContainer = styled.div`
  ${tw`cursor-pointer w-48 h-48 rounded-full flex items-center justify-center relative`}
`;

const Avatar = styled.img`
  ${tw`w-48 h-48 rounded-full`}
  position: absolute;
`;

const Email = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const ProfileEditPresenter = ({
  loading,
  inputEl,
  avatar,
  email,
  username,
  formik,
  handlePickAvatar,
}) => {
  return (
    <Container>
      <Helmet>
        <title>会員情報修正 | ココ</title>
      </Helmet>
      <form
        className="w-full flex flex-col items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <AvatarContainer>
          <Avatar src={avatar} />
          <Plus size={40} className="absolute" />
          <input
            ref={inputEl}
            className="opacity-0 w-48 h-48 cursor-pointer rounded-full"
            type="file"
            accept="image/*"
            onChange={(e) => {
              handlePickAvatar(e);
            }}
          />
        </AvatarContainer>
        <Email>{email}</Email>
        <div className="w-1/3 mx-auto">
          <InputContainer>
            <Field
              label="ユーザ名"
              type="text"
              name="username"
              errors={formik.errors.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="ユーザ名"
            />
          </InputContainer>
          <Button
            type="submit"
            title={"修正"}
            accent={true}
            loading={loading}
          />
        </div>
      </form>
    </Container>
  );
};

export default ProfileEditPresenter;
