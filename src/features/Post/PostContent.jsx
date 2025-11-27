import styled from "styled-components";
import { variantSize } from "../../styles/VariantSize";
import Text from "../../components/Text";
import { usePost } from "./PostContext";

function PostContent() {
  const { postData, variant } = usePost();
  const { title, text, image } = postData; // added optional image support

  return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{text}</Text>

      {image && (
        <ImageContainer>
          <Image src={image} alt={title || "Post image"} />
        </ImageContainer>
      )}
    </TextWrapper>
  );
}

export default PostContent;

// --- Styled Components ---
const TextWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  gap: 0.5rem;
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const ImageContainer = styled.div`
  margin-top: 0.75rem;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;
