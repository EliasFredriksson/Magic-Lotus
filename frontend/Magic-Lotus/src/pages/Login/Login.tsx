import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";
import { isValidityValid } from "../../helpers/InputValidityHelpers";
import { isEmpty } from "../../helpers/StringValidations";
import useAuth from "../../hooks/useAuth/useAuth";
import useFetch from "../../hooks/useFetch/useFetch";
import useModal from "../../hooks/useModal/useModal";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IServiceResponse from "../../models/backend/interfaces/IServiceResponse";
import IUser from "../../models/backend/interfaces/IUser";
import "./login.scss";

interface IInputValidity {
  email: boolean;
  password: boolean;
}
const BLANK_INPUT_VALIDITY: IInputValidity = {
  email: true,
  password: true,
};

interface IInputState {
  email: string;
  password: string;
}
const BLANK_INPUT_STATE: IInputState = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // CHECK IF WE WERE HEADING TO ANOTHER PAGE.

  const [errorMsg, setErrorMsg] = useState("");
  const [ErrorModal, openErrorModal] = useModal({
    innerTsx: (
      <span
        style={{
          fontSize: "1.5rem",
        }}
      >
        {errorMsg}
      </span>
    ),
    confirmTextOrButton: "Ok",
  });

  // ============================== INPUT STATES AND VALIDATION ==============================
  const [liveValidate, setLiveValidate] = useState(false); // LIVE VALIDATE
  const [inputValidity, setInputValidity] =
    useObjectState<IInputValidity>(BLANK_INPUT_VALIDITY); // INPUT VALIDITY
  const [validationMsg, setValidationMsg] =
    useObjectState<IInputState>(BLANK_INPUT_STATE); // VALIDATION MSG
  const [inputState, setInputState] =
    useObjectState<IInputState>(BLANK_INPUT_STATE); // INPUT STATES
  // =========================================================================================

  const FetchLogin = useFetch<
    IServiceResponse<IUser>,
    {
      email: string;
      password: string;
    }
  >({
    method: "POST",
    route: "/users/login",
    base: "BACKEND",
  });

  const isFormValid = useCallback((): boolean => {
    const validity = { ...BLANK_INPUT_VALIDITY };

    if (isEmpty(inputState.email)) {
      validity.email = false;
      setValidationMsg({
        email: "You must enter your email!",
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
          body: {
            email: inputState.email,
            password: inputState.password,
          },
        });

        if (res.success) {
          login(res.data);
          navigate(from, { replace: true }); // REPLACES CURRENT URL SO LOGIN PAGE IS NOT REMEMBERED.
        } else {
          if (!res.error) {
            console.warn("UNKNOWN ERROR!: ", res);
            return;
          }

          setLiveValidate(true);
          setErrorMsg("Incorrect username / password. Try again.");
          openErrorModal();
          setValidationMsg({
            email: "",
            password: "",
          });
          setInputValidity({
            email: false,
            password: false,
          });
        }
      }
    },
    [inputState]
  );

  return (
    <main id="login-page">
      <h1>Login</h1>

      <Card>
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email"
            id="login-username"
            type="text"
            placeholder="Your email"
            value={inputState.email}
            onChange={(e) => {
              setInputState({
                email: e.target.value,
              });
            }}
            isValid={inputValidity.email}
            validationMsg={validationMsg.email}
          />

          <Input
            label="Password"
            id="login-password"
            type="password"
            placeholder="Your password"
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
        </form>
        <Button variant="link">
          <Link to="/register">Register</Link>
        </Button>
      </Card>
      <Button onClick={openErrorModal}>Open modal</Button>
      {ErrorModal}
    </main>
  );
};

export default Login;
