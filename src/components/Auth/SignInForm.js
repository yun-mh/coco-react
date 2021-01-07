import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Field from "../Field";
import Button from "../Button";
import { LOGIN, LOCAL_LOG_IN } from "../../queries/Auth/AuthQueries";
import TextButton from "../TextButton";

const SignInForm = ({ action, setAction }) => {
  const [loading, setLoading] = useState(false);

  const [loginMutation] = useMutation(LOGIN);
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "メールアドレスを入力してください。";
    } else if (!values.password) {
      errors.password = "パスワードを入力してください。";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "有効ではないメールアドレスです。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (action === "logIn") {
      if (formik.values.email !== "") {
        setLoading(true);
        try {
          const {
            data: { login: token },
          } = await loginMutation({
            variables: {
              email: formik.values.email,
              password: formik.values.password,
            },
          });
          if (token !== "" || token !== undefined) {
            localLoginMutation({ variables: { token } });
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
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    onSubmit,
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
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
      <Button type="submit" loading={loading} accent={true} title="ログイン" />
      <TextButton
        text="パスワードを忘れた場合は"
        title="パスワード再設定"
        handleClick={() => setAction("reset")}
      />
    </form>
  );
};

export default SignInForm;
