import { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import ImageSelect from "../../components/ImageSelect/ImageSelect";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import useUtility from "../../hooks/useUtility/useUtility";
import { PUBLIC_FOLDER } from "../../Public";
import "./register.scss";

interface IInputStates {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  image: File | null;
}

const Register = () => {
  const { openStatusModal, updateTitle } = useUtility();
  const { navigate } = useNavigate();

  useEffect(() => {
    updateTitle("Register");
  }, []);

  const [inputs, setInputs] = useObjectState<IInputStates>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    image: null,
  });

  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // triggerFetch({
    //   data: {
    //     username: inputs.username,
    //     email: inputs.email,
    //     password: inputs.password,
    //   },
    // });
  }, []);

  useEffect(() => {
    console.log("INPUTS\n\n", inputs);
  }, [inputs]);

  return (
    <Main id="register-page">
      <Text family="heading" size="xxxxl" weight="bold">
        Register
      </Text>
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
              />
            </section>
            <section className="right">
              <ImageSelect
                name="avatar"
                imageUrl={imgUrl}
                fallbackImageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT}
                imageSize={{
                  width: "20rem",
                  height: "20rem",
                }}
                saveOnChoice
                onSave={(file) => {
                  console.log("FILE: ", file);
                }}
              />
            </section>
          </div>

          <Button type="submit">Register</Button>
        </form>
      </Card>
    </Main>
  );
};

export default Register;
