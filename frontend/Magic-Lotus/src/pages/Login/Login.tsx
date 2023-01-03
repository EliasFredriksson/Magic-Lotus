import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";
import { isValidityValid } from "../../helpers/InputValidityHelpers";
import { isEmpty } from "../../helpers/StringValidations";
import useAuth from "../../hooks/useAuth/useAuth";
import useModal from "../../hooks/useModal/useModal";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import "./login.scss";
import { useFetchPostUserLogin } from "../../services/backend/User.service";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useUtility from "../../hooks/useUtility/useUtility";
import Text from "../../components/Text/Text";

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
        const res = await FetchLogin.triggerFetch({
          body: {
            email: inputState.email,
            password: inputState.password,
          },
        });

        if (res.object === "aborted") return;
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
      <Text family="heading" size="xxxxl" weight="bold">
        Login
      </Text>
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
            {FetchLogin.isLoading ? (
              <Spinner size="medium" variant="pulse" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Button variant="link">
          <Link to="/register">Register</Link>
        </Button>
      </Card>
    </Main>
  );
};

export default Login;
