import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Field from "../Field";
import Button from "../Button";
import { PASSWORD_RESET } from "../../queries/Auth/AuthQueries";
import TextButton from "../TextButton";

const PasswordResetForm = ({ action, setAction }) => {
  const [loading, setLoading] = useState(false);

  const [passwordResetMutation] = useMutation(PASSWORD_RESET);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "メールアドレスを入力してください。";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "有効ではないメールアドレスです。";
    }
    return errors;
  };

  const onSubmit = async () => {
    if (action === "reset") {
      if (formik.values.email !== "") {
        setLoading(true);
        try {
          const {
            data: { webPasswordReset },
          } = await passwordResetMutation({
            variables: {
              email: formik.values.email,
            },
          });
          if (webPasswordReset) {
            toast.success(
              "😄 メールを送信しました！メール箱を確認してください。"
            );
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
      email: "",
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
      <Button
        loading={loading}
        type="submit"
        accent={true}
        title="メール送信"
      />
      <TextButton
        text="パスワードを思い出した場合は"
        title="ログイン"
        handleClick={() => setAction("logIn")}
      />
    </form>
  );
};

export default PasswordResetForm;
