import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Field from "./Field";
import Button from "./Button";
import { CREATE_ACCOUNT } from "../queries/Auth/AuthQueries";

const SignUpForm = ({ action, setAction }) => {
  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "必須項目です。";
    } else if (!values.email) {
      errors.email = "必須項目です。";
    } else if (!values.password) {
      errors.password = "必須項目です。";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "有効ではないメールアドレスです。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (action === "signUp") {
      if (
        formik.values.username !== "" &&
        formik.values.email !== "" &&
        formik.values.password !== ""
      ) {
        setLoading(true);
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation({
            variables: {
              avatar:
                "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg",
              username: formik.values.username,
              email: formik.values.email,
              password: formik.values.password,
            },
          });
          if (!createAccount) {
            toast.error("😢 会員登録に失敗しました。もう一度行ってください。");
          } else {
            toast.success("😄 会員登録が完了しました！");
            setAction("logIn");
          }
        } catch (e) {
          toast.error(`😢 ${e.message}`);
          console.warn(e);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <Field
        label="ユーザ名"
        type="text"
        name="username"
        errors={formik.errors.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      <Field
        label="メールアドレス"
        type="email"
        name="email"
        errors={formik.errors.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <Field
        label="パスワード"
        type="password"
        name="password"
        errors={formik.errors.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <Button loading={loading} type="submit" accent={true} title="会員登録" />
    </form>
  );
};

export default SignUpForm;
