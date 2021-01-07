import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Field from "../../components/Field";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { PASSWORD_CHANGE } from "../../queries/Auth/AuthQueries";
import { useMutation } from "@apollo/client";

const Container = styled.div`
  ${tw`h-screen flex items-center justify-center`}
  background-image: url(${require(`../../assets/images/change.jpg`)});
  background-size: cover;
  background-position: top;
  box-shadow: inset 0 0 0 2000px rgba(187, 227, 222, 0.75);
`;

const Card = styled.div`
  ${tw`bg-white w-2/3 md:w-1/4 rounded-lg`}
`;

const LogoContainer = styled.div`
  ${tw`flex flex-col flex-none justify-center items-center my-12`}
`;

const Logo = styled.img`
  ${tw`w-10 h-10 m-1`}
`;

const LogoTitle = styled.img`
  ${tw`h-3`}
`;

const Title = styled.h2`
  ${tw`h-3 my-5 text-2xl text-gray-700`}
`;

const PasswordResetPresenter = ({ loading, isChecked, email }) => {
  const history = useHistory();

  const [btnloading, setBtnLoading] = useState(false);

  const [passwordChangeMutation] = useMutation(PASSWORD_CHANGE);

  const validate = (values) => {
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = "新しく設定するパスワードを入力してください。";
    } else if (!values.checkPassword) {
      errors.checkPassword = "もう一度設定するパスワードを入力してください。";
    } else if (values.checkPassword !== values.newPassword) {
      errors.checkFailed = "パスワードが一致しません。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (
      formik.values.newPassword !== "" &&
      formik.values.checkPassword !== "" &&
      formik.values.newPassword === formik.values.checkPassword
    ) {
      setBtnLoading(true);
      try {
        await passwordChangeMutation({
          variables: {
            email,
            password: formik.values.newPassword,
          },
        });
        toast.success("😄 パスワード再設定が完了しました！");
        history.replace("/");
      } catch (e) {
        toast.error(`😢 ${e.message}`);
        console.warn(e);
      } finally {
        setBtnLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      checkPassword: "",
    },
    validate,
    validateOnChange: false,
    onSubmit,
  });

  return (
    <Container>
      <Helmet>
        <title>パスワード再設定 | ココ</title>
      </Helmet>
      <Card>
        <LogoContainer>
          <Logo src={require("../../assets/images/logo.png")} />
          <LogoTitle src={require("../../assets/images/title.png")} />
          <Title>パスワード再設定</Title>
        </LogoContainer>
        {loading ? (
          <div className="w-full flex items-center justify-center mb-10">
            <Loader />
          </div>
        ) : isChecked ? (
          <form className="w-full px-8 pb-5" onSubmit={formik.handleSubmit}>
            <Field
              label="新しいパスワード"
              type="password"
              name="newPassword"
              errors={formik.errors.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            <Field
              label="パスワード確認"
              type="password"
              name="checkPassword"
              errors={formik.errors.checkPassword || formik.errors.checkFailed}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.checkPassword}
            />
            <Button
              loading={btnloading}
              type="submit"
              accent={true}
              title="再設定"
            />
          </form>
        ) : (
          <div className="w-full px-8 pb-5 text-center">
            有効ではないアクセスです。
            <br />
            パスワード再設定をもう一度行ってください。
            <Button
              accent={true}
              title="ログインへ"
              onClick={() => history.replace("/")}
            />
          </div>
        )}
      </Card>
    </Container>
  );
};

export default PasswordResetPresenter;
