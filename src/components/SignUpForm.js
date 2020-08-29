import React from "react";
import { Formik } from "formik";
import Field from "./Field";
import Button from "./Button";

const SignInForm = () => (
  <Formik
    initialValues={{ username: "", email: "", password: "" }}
    validate={(values) => {
      const errors = {};
      if (!values.email || !values.username || !values.password) {
        errors.email = "データを入力してください。";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "有効ではないメールアドレスです。";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ values, handleChange, errors, handleBlur, isSubmitting, touched }) => (
      <form className="w-full">
        <Field
          label="ユーザ名"
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        <Field
          label="メールアドレス"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <Field
          label="パスワード"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <Button type="submit" accent={true} title="会員登録" />
      </form>
    )}
  </Formik>
);

export default SignInForm;
