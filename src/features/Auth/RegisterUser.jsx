import styled from "styled-components";
import Input from "../../components/Input";

function RegisterUser({ onChange }) {
  return (
    <FormBody>
      <h2>Account</h2>
      <p style={{ fontSize: "0.8rem", opacity: "0.6" }}>
        Setup your account for authentication purpose
      </p>
      <br />
      <div>
        <Row>
          <Input handleInput={(e) => onChange("Email", e.target.value)}>
            Email
          </Input>
        </Row>
        <Row>
          <Input handleInput={(e) => onChange("Password", e.target.value)}>
            Password
          </Input>
        </Row>
      </div>
    </FormBody>
  );
}

const FormBody = styled.div`
  padding: 1rem;
  max-width: 40rem;
`;
const Row = styled.div`
  margin-bottom: 1rem;
`;

export default RegisterUser;
