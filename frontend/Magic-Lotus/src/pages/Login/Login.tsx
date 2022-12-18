import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";
import { isValidityValid } from "../../helpers/InputValidityHelpers";
import { isEmpty } from "../../helpers/StringValidations";
import useAuth from "../../hooks/useAuth/useAuth";
import useFetch from "../../hooks/useFetch/useFetch";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IStrapiError from "../../models/interfaces/strapi/IStrapiError";
import { IStrapiLogin } from "../../models/interfaces/strapi/IStrapiLogin";
import { IStrapiAuthBody } from "../../services/StrapiAuth.service";
import "./login.scss";

interface IInputValidity {
  username: boolean;
  password: boolean;
}
const BLANK_INPUT_VALIDITY: IInputValidity = {
  username: true,
  password: true,
};

interface IInputState {
  username: string;
  password: string;
}
const BLANK_INPUT_STATE: IInputState = {
  username: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [liveValidate, setLiveValidate] = useState(false);

  const [inputValidity, setInputValidity] =
    useObjectState<IInputValidity>(BLANK_INPUT_VALIDITY);

  const [validationMsg, setValidationMsg] =
    useObjectState<IInputState>(BLANK_INPUT_STATE);

  const [inputState, setInputState] =
    useObjectState<IInputState>(BLANK_INPUT_STATE);

  const FetchLogin = useFetch<
    null, // Query
    IStrapiAuthBody, // Body
    IStrapiLogin, // Response
    IStrapiError // Error
  >({
    method: "POST",
    route: "/auth/local",
    base: "STRAPI",
  });

  const isFormValid = useCallback((): boolean => {
    const validity = { ...BLANK_INPUT_VALIDITY };

    if (isEmpty(inputState.username)) {
      validity.username = false;
      setValidationMsg({
        username: "You must enter your username!",
      });
    }
    if (isEmpty(inputState.password)) {
      validity.password = false;
      setValidationMsg({
        password: "You must enter your password!",
      });
    }

    setInputValidity(validity);

    if (isValidityValid(validity)) return true;
    setLiveValidate(true);
    return false;
  }, [inputState]);

  useEffect(() => {
    if (liveValidate) isFormValid();
  }, [inputState]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      // LOGIN
      if (isFormValid()) {
        console.log("SUBMITTED!");
        const res = await FetchLogin.triggerFetch({
          data: {
            identifier: inputState.username,
            password: inputState.password,
          },
        });

        if (res.success) {
          navigate("/");
        } else {
          const { error } = res.data;

          if (error.name === "ValidationError") {
            setLiveValidate(true);
            setValidationMsg({
              username: "",
              password: "Incorrect credentials!",
            });
            setInputValidity({
              username: false,
              password: false,
            });
          } else {
          }
          // alert(res.data.error.message);
        }

        console.log("LOGIN FAILED...\n\n", res);

        // login({
        //   user: loginRes.data.user,
        //   jwt: loginRes.data.jwt,
        //   role: "Admin",
        // });

        // navigate("/");
      }
    },
    [inputState]
  );

  return (
    <main id="login-page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Username"
          id="login-username"
          type="text"
          placeholder="Username"
          value={inputState.username}
          onChange={(e) => {
            setInputState({
              username: e.target.value,
            });
          }}
          isValid={inputValidity.username}
          validationMsg={validationMsg.username}
        />

        <Input
          label="Password"
          id="login-password"
          type="password"
          placeholder="Password"
          value={inputState.password}
          onChange={(e) => {
            setInputState({
              password: e.target.value,
            });
          }}
          isValid={inputValidity.password}
          validationMsg={validationMsg.password}
        />

        <Button type="submit">
          {FetchLogin.isLoading ? <Spinner size="medium" /> : "Login"}
        </Button>

        <Link to="/register" className="link">
          Register
        </Link>
      </form>
    </main>
  );
};

export default Login;
