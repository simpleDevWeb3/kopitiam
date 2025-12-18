import styled from "styled-components";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useIsDupGroupname } from "./useIsDupGroupname";
import { isValidFormat } from "../../helpers/formHelper";
import Error from "../../components/Error";

function CommunityIntro({ name, description, onChange }) {
  const [error, setError] = useState({});

  const [communityNameToValidate, setCommunityNameToValidate] = useState("");

  const { isDupGroupname, isLoading } = useIsDupGroupname(
    communityNameToValidate
  );
  useEffect(() => {
    onChange?.("groupnameDup", isDupGroupname?.isDuplicate);

    setError((prev) => ({
      ...prev,
      groupnameDup: isDupGroupname?.isDuplicate
        ? "username has been taken"
        : "",
    }));
  }, [isDupGroupname, onChange]);

  function handleCommunityname(communityName) {
    const communitynameValidForm = isValidFormat(
      /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
      communityName
    );

    if (communitynameValidForm) setCommunityNameToValidate(communityName);
    else {
      setCommunityNameToValidate("");
    }

    onChange?.("communityName", communityName);
    onChange?.("communitynameValidForm", communitynameValidForm);

    setError((prev) => ({
      ...prev,
      communitynameValidForm: !communitynameValidForm
        ? "Username must start with a letter, be between 3 and 16 characters long, and contain only letters, numbers, or underscores."
        : "",
    }));
  }

  return (
    <>
      <h2>Tell us about your community</h2>
      <p>
        A name & description help students understand what your community is
        about
      </p>
      <br />
      <StyledContainer>
        <div style={{ width: "30rem" }}>
          <Input handleInput={(e) => handleCommunityname(e.target.value)}>
            Name
          </Input>
          {isLoading && (
            <span style={{ fontSize: "0.8rem", color: "gray" }}>
              Checking availability...
            </span>
          )}

          {/*check name format */}
          {error?.communitynameValidForm && (
            <Error msg={error?.communitynameValidForm} />
          )}
          {/*check duplicate name */}
          {!error?.communitynameValidForm && error?.groupnameDup && (
            <Error msg={error?.groupnameDup} />
          )}
          <br />
          <Input
            handleInput={(e) =>
              onChange("communityDescription", e.target.value)
            }
          >
            Description
          </Input>
        </div>

        <ProfileCard>
          <h2>C/{name || "CommunityName"}</h2>
          <br />
          <p>{description || "Your Community Description"}</p>
        </ProfileCard>
      </StyledContainer>
    </>
  );
}

export default CommunityIntro;

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
