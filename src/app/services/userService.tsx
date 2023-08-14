import axios from "axios";
import { FC } from "react";
import * as qs from "qs";
import jwtDecode, { JwtPayload } from "jwt-decode";

const config_header = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/x-www-form-urlencoded",
};

async function login(username: string, password: string) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.NEXT_PUBLIC_API_URL + "auth/login",
    headers: config_header,
    data: qs.stringify({ user_id: username, user_key: password }),
  };

  const res = await axios.request(config);
  const data = await res.data;
  return data;
}
function logout() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}
const isTokenExpired = (token: string) => {
  // Extract the expiration time from the token (assuming it's a JWT)
  const { exp } = jwtDecode<JwtPayload>(token);
  if (exp) {
    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    return currentTime > exp;
  }
};
export default {
  login,
  logout,
  isLoggedIn,
};
