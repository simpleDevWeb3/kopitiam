import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);

  function toLogin() {
    setIsRegister(false);
  }

  function toRegister() {
    setIsRegister(true);
  }
  return (
    <>
      {isRegister ? (
        <RegisterForm toLogin={toLogin} />
      ) : (
        <LoginForm onClick={toRegister} />
      )}
    </>
  );
}

export default AuthForm;
