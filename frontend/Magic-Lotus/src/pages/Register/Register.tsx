import { FormEvent, useCallback, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import Text from "../../components/Text/Text";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import useUtility from "../../hooks/useUtility/useUtility";
import "./register.scss";

interface IInputStates {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
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
  });

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

  return (
    <Main id="register-page">
      <Text family="heading" size="xxxxl" weight="bold">
        Register
      </Text>
      <Card>
        <form onSubmit={handleSubmit} className="register-form">
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

          <Button type="submit">Register</Button>
        </form>
      </Card>
    </Main>
  );
};

export default Register;
