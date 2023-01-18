import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import ImageSelect from "../../components/ImageSelect/ImageSelect";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Spinner from "../../components/Spinner/Spinner";
import { isValid } from "../../helpers/InputValidityHelpers";
import {
  hasNumber,
  hasUniqueCharacter,
  isEmail,
  isEmpty,
} from "../../helpers/StringValidations";
import useModal from "../../hooks/useModal/useModal";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import useUtility from "../../hooks/useUtility/useUtility";
import IFile from "../../models/backend/interfaces/IFile";
import { PUBLIC_FOLDER } from "../../Public";
import { useFetchPostUser } from "../../services/backend/User.service";
import "./register.scss";

type IInputStates = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  image: IFile | null;
};
const BLANK_INPUT_STATES: IInputStates = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  image: null,
};

type IInputValidity = {
  [Prop in keyof IInputStates]: boolean;
};
const BLANK_INPUT_VALIDITY: IInputValidity = {
  username: true,
  email: true,
  password: true,
  repeatPassword: true,
  image: true,
};

type IInputMessages = {
  [Props in keyof IInputStates]: string;
};
const BLANK_INPUT_MESSAGES: IInputMessages = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  image: "",
};

const MINIMUM_PASSWORD_LENGTH = 4;

const Register = () => {
  const { openStatusModal, updateTitle } = useUtility();
  const { navigate } = useNavigate();
  const registerUser = useFetchPostUser();

  const [liveValidate, setLiveValidate] = useState(false);
  const [validity, setValidity] = useObjectState(BLANK_INPUT_VALIDITY);
  const [inputs, setInputs] = useObjectState<IInputStates>(BLANK_INPUT_STATES);
  const [messages, setMessages] =
    useObjectState<IInputMessages>(BLANK_INPUT_MESSAGES);

  const [successModal, openSuccessModal] = useModal({
    innerTsx: <span>Register successful!</span>,
    confirmTextOrButton: "Ok",
    onClose: () => {
      navigate("/login");
    },
  });

  const isFormValid = useCallback(() => {
    const val = { ...BLANK_INPUT_VALIDITY };
    const msgs = { ...BLANK_INPUT_MESSAGES };

    // USERNAME
    if (isEmpty(inputs.username)) {
      val.username = false;
      msgs.username = "You must provide a username!";
    }
    // EMAIL
    if (!isEmail(inputs.email)) {
      val.email = false;
      msgs.email = "You must provide a valid email!";
    }
    // PASSWORD
    if (inputs.password.length < MINIMUM_PASSWORD_LENGTH) {
      val.password = false;
      msgs.password = "Your password is too short!";
    } else if (!hasNumber(inputs.password)) {
      val.password = false;
      msgs.password = "Your password must contain a number!";
    } else if (!hasUniqueCharacter(inputs.password)) {
      val.password = false;
      msgs.password = "Your password must contain a unique character!";
    }
    // REPEAT PASSWORD
    if (inputs.password !== inputs.repeatPassword) {
      val.repeatPassword = false;
      msgs.repeatPassword = "Passwords do not match!";
    }

    setMessages(msgs);
    setValidity(val);

    if (isValid(val)) return true;
    setLiveValidate(true);
    return false;
  }, [inputs]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      console.log("SUBMITTED!", isFormValid());
      e.preventDefault();
      if (isFormValid()) {
        const res = await registerUser.triggerFetch({
          body: {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            repeatPassword: inputs.repeatPassword,
            image: inputs.image,
          },
        });
        if (res.object === "aborted") return;
        if (
          res.object === "network_error" ||
          res.object === "unknown_error" ||
          res.object === "magic_lotus_error"
        ) {
          openStatusModal(res.error);
          return;
        }
        openSuccessModal();
      }
    },
    [inputs]
  );

  useEffect(() => {
    if (liveValidate) isFormValid();
  }, [inputs]);

  useEffect(() => {
    updateTitle("Register");
  }, []);

  return (
    <Main id="register-page">
      <Header title="Register" />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="register-form"
          encType="multipart/form-data"
        >
          <div className="inputs">
            <section className="left">
              <Input
                label="Username"
                id="register-username"
                type="text"
                placeholder="Your username here"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({
                    username: e.target.value,
                  });
                }}
                isValid={validity.username}
                validationMsg={messages.username}
              />
              <Input
                label="Email"
                id="register-email"
                type="email"
                placeholder="Your email here"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({
                    email: e.target.value,
                  });
                }}
                isValid={validity.email}
                validationMsg={messages.email}
              />
              <Input
                label="Password"
                id="register-password"
                type="password"
                placeholder="Your password here"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({
                    password: e.target.value,
                  });
                }}
                isValid={validity.password}
                validationMsg={messages.password}
              />
              <Input
                label="Repeat password"
                id="register-repeat-pass"
                type="password"
                placeholder="Repeat your password"
                value={inputs.repeatPassword}
                onChange={(e) => {
                  setInputs({
                    repeatPassword: e.target.value,
                  });
                }}
                isValid={validity.repeatPassword}
                validationMsg={messages.repeatPassword}
              />
            </section>
            <section className="right">
              <ImageSelect
                name="avatar"
                fallbackImageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT}
                imageSize={{
                  width: "20rem",
                  height: "20rem",
                }}
                saveOnChoice
                onSave={(file) => {
                  setInputs({
                    image: file,
                  });
                }}
              />
            </section>
          </div>

          <Button type="submit">
            {registerUser.isLoading ? (
              <Spinner variant="pulse" size="medium" />
            ) : (
              <>Register</>
            )}
          </Button>
        </form>
      </Card>
      {successModal}
    </Main>
  );
};

export default Register;
