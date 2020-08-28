import React from "react";
import { Formik } from "formik";
import Field from "./Field";
import Button from "./Button";

const SignInForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "メールアドレスを入力してください。";
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
    render={({
      values,
      handleChange,
      errors,
      handleBlur,
      isSubmitting,
      touched,
    }) => (
      <form className="w-full">
        <Field
          label="メールアドレス"
          type="email"
          name="email"
          errors={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <Field
          label="パスワード"
          type="password"
          name="password"
          errors={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <Button type="submit" accent={true} title="ログイン" />
      </form>
    )}
  />
);

export default SignInForm;
