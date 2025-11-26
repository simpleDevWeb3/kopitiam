import styled from "styled-components";
import Input from "../../components/Input";
import { useState, useEffect } from "react"; // Added useEffect
import Error from "../../components/Error";
import { isValidFormat } from "../../helpers/formHelper"; // Removed isDup (we use API now)
import { useIsDupEmail } from "./useIsDupEmail";

function RegisterUser({ onChange }) {
  const [errors, setErrors] = useState({});
  const [emailToValidate, setEmailToValidate] = useState(""); // State specifically for the API hook

  // 1. Run the Hook (It listens to emailToValidate)
  const { isDupEmail, isLoading } = useIsDupEmail(emailToValidate);

  // 2. NEW: Use useEffect to listen for the API result
  // This runs whenever the API comes back with a new answer (true/false)
  useEffect(() => {
    // Tell Parent Component if it's duplicate
    onChange("EmailIsDuplicate", !!isDupEmail);
    console.log("isDupMail: ", isDupEmail);
    console.log(
      "isDupemaile: ",
      isDupEmail ? "Email has been registered!" : ""
    );
    // Update Local UI Error
    setErrors((prev) => ({
      ...prev,
      duplicate: isDupEmail?.isDuplicate ? "Email has been registered!" : "",
    }));
  }, [isDupEmail, onChange]);

  function handleEmailInput(mail) {
    const email = mail.trim();

    // 3. Synchronous Checks (Format)
    const formatValid = isValidFormat(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email);

    // Update Parent Immediately (Format only)
    onChange("Email", email);
    onChange("EmailFormatValid", formatValid);

    // 4. Trigger the API Hook
    // Only ask API if format is valid (saves server calls)
    if (formatValid) {
      setEmailToValidate(email);
    } else {
      setEmailToValidate(""); // Clear API check if format is broken
    }

    // 5. Update UI Errors (Format Only)
    // Note: We intentionally clear 'duplicate' here so the error disappears while typing
    setErrors((prev) => ({
      ...prev,
      format: !formatValid
        ? "Please enter a valid email address (e.g., name@example.com)."
        : "",
      duplicate: "", // Reset duplicate error while user is typing
    }));
  }

  function handlePasswordInput(pass) {
    const password = pass.trim();
    const isValidFormPassword = isValidFormat(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      password
    );
    onChange("Password", password);
    onChange("isValidFormPass", isValidFormPassword);
    setErrors((prev) => ({
      ...prev,
      isValidFormPassword: !isValidFormPassword
        ? "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        : "",
    }));
  }

  return (
    <FormBody>
      <h2>Account</h2>
      <p style={{ fontSize: "0.8rem", opacity: "0.6" }}>
        Setup your account for authentication purpose
      </p>
      <br />
      <div>
        <Row>
          <Input handleInput={(e) => handleEmailInput(e.target.value)}>
            Email
          </Input>

          {/* Show Format Error */}
          {errors.format && <Error msg={errors.format} />}

          {/* Show Duplicate Error (from API) */}
          {!errors.format && errors.duplicate && (
            <Error msg={errors.duplicate} />
          )}

          {/* Optional: Show Loading Spinner */}
          {isLoading && (
            <span style={{ fontSize: "0.8rem", color: "gray" }}>
              Checking availability...
            </span>
          )}
        </Row>

        <Row>
          <Input handleInput={(e) => handlePasswordInput(e.target.value)}>
            Password
          </Input>
          {errors.isValidFormPassword && (
            <Error msg={errors.isValidFormPassword} />
          )}
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
