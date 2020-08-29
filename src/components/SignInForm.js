import React from "react";
import { useFormik } from "formik";
import Field from "./Field";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { LOGIN, LOCAL_LOG_IN } from "../queries/Auth/AuthQueries";

const SignInForm = ({ action }) => {
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

  const onSubmit = async (e) => {
    console.log(e);
    // e.preventDefault();
    if (action === "logIn") {
      if (formik.values.email !== "") {
        try {
          const {
            data: { login: token },
          } = await loginMutation({
            variables: {
              email: formik.values.email,
              password: formik.values.password,
            },
          });
          console.log(token);
          if (token !== "" || token !== undefined) {
            console.log("het");
            localLoginMutation({ variables: { token } });
          } else {
            console.warn("error");
          }
        } catch {
          // toast.error("Cannot request secret mail, try again");
        }
      } else {
        // toast.error("Email is required");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
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
      <Button type="submit" accent={true} title="ログイン" />
    </form>
  );
};

export default SignInForm;
