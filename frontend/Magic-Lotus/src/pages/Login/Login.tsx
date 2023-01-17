import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";
import { isEmail, isEmpty } from "../../helpers/StringValidations";
import useAuth from "../../hooks/useAuth/useAuth";
import useModal from "../../hooks/useModal/useModal";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import "./login.scss";
import { useFetchPostUserLogin } from "../../services/backend/User.service";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useUtility from "../../hooks/useUtility/useUtility";
import Text from "../../components/Text/Text";
import { isValid } from "../../helpers/InputValidityHelpers";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import Header from "../../components/Header/Header";

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
  const { openStatusModal, updateTitle } = useUtility(); // UTILITY FUNCTIONS
  const { login } = useAuth(); // AUTHENTICATION
  const { navigate } = useNavigate(); // NAVIGATE
  const { breakpoints } = useScreenSize();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // CHECK IF WE WERE HEADING TO ANOTHER PAGE.

  // ============================== INPUT STATES AND VALIDATION ==============================
  const [liveValidate, setLiveValidate] = useState(false); // LIVE VALIDATE
  const [inputValidity, setInputValidity] =
    useObjectState<IInputValidity>(BLANK_INPUT_VALIDITY); // INPUT VALIDITY
  const [validationMsg, setValidationMsg] =
    useObjectState<IInputState>(BLANK_INPUT_STATE); // VALIDATION MSG
  const [inputState, setInputState] =
    useObjectState<IInputState>(BLANK_INPUT_STATE); // INPUT STATES
  // =========================================================================================

  const FetchLogin = useFetchPostUserLogin();

  const isFormValid = useCallback((): boolean => {
    const validity = { ...BLANK_INPUT_VALIDITY };

    if (!isEmail(inputState.email)) {
      validity.email = false;
      setValidationMsg({
        email: "You must enter a valid email!",
      });
    }
    if (isEmpty(inputState.password)) {
      validity.password = false;
      setValidationMsg({
        password: "You must enter your password!",
      });
    }

    setInputValidity(validity);

    if (isValid(validity)) return true;
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
        const res = await FetchLogin.triggerFetch({
          body: {
            email: inputState.email,
            password: inputState.password,
          },
        });

        if (res.object === "aborted") return;
        if (res.object === "network_error" || res.object === "unknown_error") {
          openStatusModal(res.error);
          return;
        }
        if (res.object === "magic_lotus_error") {
          setLiveValidate(true);
          openStatusModal("Incorrect username / password. Try again.");
          setValidationMsg({
            email: "",
            password: "",
          });
          setInputValidity({
            email: false,
            password: false,
          });
          return;
        }

        login(res.data);
        navigate(from, { replace: true });
      }
    },
    [inputState]
  );

  useEffect(() => {
    updateTitle("Login");
  }, []);

  return (
    <Main id="login-page">
      <Header title="Login" />

      <Card className="login-card">
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
            fontSize={breakpoints.IS_MOBILE ? "l" : "xl"}
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
            fontSize={breakpoints.IS_MOBILE ? "l" : "xl"}
          />

          <Button type="submit" fontSize={breakpoints.IS_MOBILE ? "l" : "xl"}>
            {FetchLogin.isLoading ? (
              <Spinner size="medium" variant="pulse" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Button
          variant="link"
          fontSize={breakpoints.IS_MOBILE ? "l" : "xl"}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </Card>
    </Main>
  );
};

export default Login;
