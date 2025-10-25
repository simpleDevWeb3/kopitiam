// Avatar.js
import styled from "styled-components";

const AvatarBorder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* avoids small gaps */
`;

function Avatar({ src, alt }) {
  return (
    <AvatarBorder>
      <StyledImage src={src} alt={alt} />
    </AvatarBorder>
  );
}

export default Avatar;
