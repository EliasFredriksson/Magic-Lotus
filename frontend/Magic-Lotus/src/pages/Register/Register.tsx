import { FormEvent, useCallback } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import useNavigate from "../../hooks/useNavigate/useNavigate";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import "./register.scss";

interface IInputStates {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Register = () => {
  const { navigate } = useNavigate();

  const [inputs, setInputs] = useObjectState<IInputStates>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  //                          Query  Body            Response

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
      <h1>Register</h1>
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
    </Main>
  );
};

export default Register;
