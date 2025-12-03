import styled from "styled-components";
import { variantSize } from "../../styles/VariantSize";
import Text from "../../components/Text";
import { usePost } from "./PostContext";
import Carousel from "../../components/Carousel";

function PostContent() {
  const { postData, variant } = usePost();

  const { title, text, postImage_url, content } = postData;

  // --- THE FIX ---
  // Convert the object into an array of entries: [[id, url], [id, url]]
  // This allows us to check .length and map over it easily.
  const imageEntries = postImage_url ? Object.entries(postImage_url) : [];

  return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{text ?? content}</Text>

      {/* 1. Single Image Logic */}
      {/* We check imageEntries.length now, which works! */}
      {imageEntries.length === 1 && (
        <ImageContainer>
          {/* imageEntries[0] gives ["ID", "URL"], so we take the second item [1] */}
          <Image src={imageEntries[0][1]} alt={title || "Post image"} />
        </ImageContainer>
      )}

      {/* 2. Carousel Logic (More than 1 image) */}
      {imageEntries.length > 1 && (
        <Carousel
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          hideWhenCurrentSlide={true}
          total={imageEntries.length}
        >
          <Carousel.Count />
          <Carousel.Track>
            {/* We map over the array we created at the top */}
            {imageEntries.map(([key, url], index) => (
              <Carousel.Card
                key={key} // distinct key from backend
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundSize: "cover",
                }}
              >
                <ImageContainer>
                  <Image src={url} alt={title || "Post image"} />
                </ImageContainer>
              </Carousel.Card>
            ))}
          </Carousel.Track>

          <Carousel.PrevBtn
            style={{
              backgroundColor: "var(--tertiary-color)",
              borderRadius: "50%",
            }}
            positionY="center"
          />
          <Carousel.NextBtn
            style={{
              backgroundColor: "var(--tertiary-color)",
              borderRadius: "50%",
            }}
            positionY="center"
          />
          <Carousel.Tracker type={"img"} />
        </Carousel>
      )}
      <br />
    </TextWrapper>
  );
}

export default PostContent;

// ... (Your styled components remain the same) ...
const TextWrapper = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  gap: 0.5rem;
  ${({ $variant }) => variantSize[$variant] || ""}
  overflow-wrap: break-word;
  word-break: break-word;
`;

const ImageContainer = styled.div`
  margin-top: 0.75rem;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 40rem;
  border-radius: 25px;
  height: auto;
  object-fit: cover;
  display: block;
`;
