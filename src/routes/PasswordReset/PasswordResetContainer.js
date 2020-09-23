import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { VIEW_USER, TOKEN_CHECK } from "../../queries/Auth/AuthQueries";
import PasswordResetPresenter from "./PasswordResetPresenter";

const PasswordResetContainer = ({ location: { pathname } }) => {
  const param = pathname.split("/reset/")[1];
  const [userid, token] = param.split("/");

  const [isChecked, setIsChecked] = useState();
  const [email, setEmail] = useState();

  const { loading, data } = useQuery(TOKEN_CHECK, { variables: { token } });

  const { loading: userLoading, data: userData } = useQuery(VIEW_USER, {
    variables: { id: userid },
  });

  useEffect(() => {
    if (!loading) {
      setIsChecked(data.tokenCheck);
    }
  }, [loading, data]);

  useEffect(() => {
    if (!userLoading) {
      setEmail(userData.viewUser.email);
    }
  }, [userLoading, userData]);

  return (
    <PasswordResetPresenter
      loading={loading}
      isChecked={isChecked}
      email={email}
    />
  );
};

export default withRouter(PasswordResetContainer);
