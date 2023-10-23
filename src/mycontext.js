import { createContext } from "react";

export const authorised_user = {
    name: '',
    password: '',
    email: '',
    authorised: false,
    token: "",
    quotes: []
  };

export const LoginContext = createContext(
    authorised_user
  );