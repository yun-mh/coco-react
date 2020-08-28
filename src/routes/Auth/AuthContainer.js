import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";

const AuthContainer = () => {
  const [action, setAction] = useState("logIn");

  const handleAction = () => {
    if (action === "logIn") {
      setAction("signIn");
    } else {
      setAction("logIn");
    }
  };

  return <AuthPresenter action={action} handleAction={handleAction} />;
};

export default AuthContainer;
