import styled from "styled-components";
import Input from "../../components/Input";

function RegisterProfile({ name = "", description = "", onChange }) {
  return (
    <>
      <h2>Tell us about your self</h2>
      <p>
        A name & description help other student remember you
      </p>
      <br />
      <StyledContainer>
        <div style={{ width: "30rem" }}>
          <Input
            handleInput={(e) => onChange?.("username", e.target.value)}
          >
           Username
          </Input>
          <br />
          <Input
            handleInput={(e) =>
              onChange?.("userDescription", e.target.value)
            }
          >
            Description
          </Input>
        </div>

        <ProfileCard>
          <h2>u/{name || "Username"}</h2>
          <br />
          <p>{description || "Your User Description"}</p>
        </ProfileCard>
      </StyledContainer>
    </>
  );
}

export default RegisterProfile;

const StyledContainer = styled.div`
  display: flex;

  gap: 0.5rem;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const ProfileCard = styled.div`
  border: solid 1px var(--hover-color);
  border-radius: 25px;
  padding: 1rem;
  padding-bottom: 1.5rem;
  height: 100%;
  flex: 1;
  width: 18rem;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  box-shadow: 0px 5px 5px var(--hover-color);

  @media (max-width: 800px) {
    width: 100%;
  }
`;
