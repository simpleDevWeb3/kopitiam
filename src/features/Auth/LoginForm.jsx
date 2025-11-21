import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // make sure react-router-dom is installed
import { useAuth } from "./AuthContext";
import { useModal } from "../../context/ModalContext";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";
import { useLogin } from "./useLogin";

function LoginForm({ onLogin, onClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const { login, isLoading } = useLogin();
  const { closeModal } = useModal();
  function handleChange(e, field) {
    const { value } = e.target;

    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    if (onLogin) {
      onLogin(formData);
    }
    login(formData);

    closeModal();
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Login</Title>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Input handleInput={(e) => handleChange(e, "email")}>Email</Input>

      <Input handleInput={(e) => handleChange(e, "password")}>Password</Input>

      <ButtonIcon>Login</ButtonIcon>

      <SignupPrompt>
        Don’t have an account?{" "}
        <label
          style={{
            color: "var(--text-color)",
            fontWeight: 700,
            cursor: "pointer",
            opacity: 1,
          }}
          onClick={() => onClick?.()}
          onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
        >
          Sign up
        </label>
      </SignupPrompt>
    </FormContainer>
  );
}

export default LoginForm;

/* ---------- Styled Components ---------- */

const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: inherit;
  color: var(--text-color);
  width: 500px;
  @media (max-width: 800px) {
    width: inherit;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;

const SignupPrompt = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color);
`;

const StyledLink = styled(Link)`
  color: var(--primary-color, #6f4e37);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
