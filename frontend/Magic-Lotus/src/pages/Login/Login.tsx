import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useFetch from "../../hooks/useFetch/useFetch";
import {
  BLANK_STRAPI_LOGIN,
  IStrapiLogin,
} from "../../models/interfaces/strapi/IStrapiLogin";
import { IStrapiAuthBody } from "../../services/StrapiAuth.service";
import "./login.scss";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  //                          Query  Body            Response
  const FetchLogin = useFetch<null, IStrapiAuthBody, IStrapiLogin>({
    method: "POST",
    route: "auth/local",
    base: "STRAPI",
  });
  const FetchRole = useFetch<null, null, any>({
    method: "GET",
    route: "users/me",
    base: "STRAPI",
  });

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      console.log("SUBMIT: ", username, pass);

      // LOGIN
      const loginRes = await FetchLogin.triggerFetch({
        data: {
          identifier: username,
          password: pass,
        },
      });

      if (!loginRes.success) {
        console.log("FAILED TO LOGIN: ", loginRes.error, loginRes.data);
        return;
      }

      login({
        user: loginRes.data.user,
        jwt: loginRes.data.jwt,
        role: "Admin",
      });

      navigate("/");
    },
    [username, pass]
  );

  return (
    <main id="login-page">
      <h1>LOGIN PAGE</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          value={pass}
          placeholder="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button type="submit">
          {FetchLogin.isLoading || FetchRole.isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default Login;
