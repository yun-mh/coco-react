import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";

const AuthContainer = () => {
  const [action, setAction] = useState("logIn");

  return <AuthPresenter action={action} />;
};

export default AuthContainer;
