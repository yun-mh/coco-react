import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOCAL_LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export const PASSWORD_RESET = gql`
  mutation webPasswordReset($email: String!) {
    webPasswordReset(email: $email)
  }
`;

export const TOKEN_CHECK = gql`
  query tokenCheck($token: String!) {
    tokenCheck(token: $token)
  }
`;

export const VIEW_USER = gql`
  query viewUser($id: String!) {
    viewUser(id: $id) {
      id
      email
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation passwordChange($email: String!, $password: String!) {
    passwordChange(email: $email, password: $password)
  }
`;

export const CHECK_USER = gql`
  query checkUser($email: String!) {
    checkUser(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $avatar: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      avatar: $avatar
      username: $username
      email: $email
      password: $password
    )
  }
`;

export const SET_DOG = gql`
  mutation setDog(
    $image: String
    $name: String!
    $breed: String!
    $gender: String!
    $birthdate: String!
    $email: String!
  ) {
    setDog(
      image: $image
      name: $name
      breed: $breed
      gender: $gender
      birthdate: $birthdate
      email: $email
    )
  }
`;
