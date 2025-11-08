import styled from "styled-components";
import Avatar from "./Avatar";
import ButtonIcon from "./ButtonIcon";
import { BiBell } from "react-icons/bi";
import { HiPlus } from "react-icons/hi2";
import { useState, useEffect } from "react";

function CommunityProfileCard({ communityData }) {
  const { name } = communityData;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledContainer>
      <BannerContainer>
        <Banner>
          <img src="/avatar.jpg" />
        </Banner>

        {windowWidth > 800 && (
          <AvatarContainer>
            <Avatar src={"/avatar.jpg"} />
          </AvatarContainer>
        )}
      </BannerContainer>

      <HorizontalContainer>
        <ReservedContainer />
        <HorizontalContainer2>
          {windowWidth <= 800 && (
            <AvatarContainerMobile>
              <Avatar src={"/avatar.jpg"} />
            </AvatarContainerMobile>
          )}

          <GroupName>{name}</GroupName>
          {windowWidth > 800 && (
            <FeatureRows>
              <ButtonIcon icon={<AddIcon />} variant="outline">
                <span>Create Post</span>
              </ButtonIcon>
              <ButtonIcon variant="outline">
                <span>Join</span>
              </ButtonIcon>
              <ButtonIcon
                size="rounded"
                variant="outline"
                shape={"circle"}
                icon={<Bell />}
              />
            </FeatureRows>
          )}
        </HorizontalContainer2>
      </HorizontalContainer>
      {windowWidth <= 800 && (
        <FeatureRows>
          <ButtonIcon icon={<AddIcon />} variant="outline">
            <span>Create Post</span>
          </ButtonIcon>
          <ButtonIcon variant="outline">
            <span>Join</span>
          </ButtonIcon>
          <ButtonIcon
            size="rounded"
            variant="outline"
            shape={"circle"}
            icon={<Bell />}
          />
        </FeatureRows>
      )}
    </StyledContainer>
  );
}

const AddIcon = styled(HiPlus)`
  font-size: 1.3rem;
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;
const Bell = styled(BiBell)`
  font-size: 1.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;

  @media (max-width: 800px) {
    font-size: 1rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
`;
const GroupName = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 0.5rem;
  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  color: var(--text-color);
  flex-direction: column;
  width: 100%;
`;

const ReservedContainer = styled.div`
  width: 4rem;
  margin-right: 2rem;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Banner = styled.div`
  height: 8rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  & > img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 800px) {
    height: 6rem;
    border-radius: 0px;
  }
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FeatureRows = styled.div`
  display: flex;
  gap: 0.5rem;

  margin-top: 0.2rem;

  & span {
    font-size: 0.8rem;

    @media (max-width: 800px) {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 800px) {
    padding-left: 0.8rem;
  }
`;

const AvatarContainer = styled.div`
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  position: absolute;
  top: 6rem;
  left: 1rem;
  border-radius: 50%;
  border: solid 0.2rem var(--tertiary-color);
`;

const AvatarContainerMobile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: solid 0.2rem white;
  overflow: hidden;
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const HorizontalContainer2 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 0.5rem;
  @media (max-width: 800px) {
    justify-content: start;
    padding-left: 0.5rem;
  }
`;

export default CommunityProfileCard;
