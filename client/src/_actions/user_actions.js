import axios from "axios";
import { response } from "express";

export function loginUser(dataToSubmit) {
  const request = axios("/api/users/login", dataToSubmit).then(
    (response) => response.data
  );

  return {
    type: "LOGIN_USER",
    payload: request,
  };
}
