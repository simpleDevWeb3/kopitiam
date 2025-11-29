import { createContext, useContext, useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { VscNoNewline } from "react-icons/vsc";

/* eslint-disable react-refresh/only-export-components */
const CarouselContext = createContext();

function Carousel({
  children,
  total,
  hideWhenCurrentSlide = false,
  canMoveNext,
  onSlideChange,
  style,
}) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (canMoveNext && !canMoveNext(index)) return; // block if validation fails
    setIndex((i) => Math.min(i + 1, total - 1));
  };
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const restoreSlide = () => setIndex(0);

  useEffect(() => {
    if (onSlideChange) onSlideChange(index);
  }, [index, onSlideChange]);

  return (
    <CarouselContext.Provider
      value={{
        next,
        prev,
        index,
        total,
        hideWhenCurrentSlide,
        restoreSlide,
        canMoveNext,
      }}
    >
      <Container>{children}</Container>
    </CarouselContext.Provider>
  );
}
function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (ctx === undefined)
    throw new Error("useCarousel is used outside the Carousel");
  return ctx;
}

function Track({ children, style }) {
  const { index } = useCarousel();
  return (
    <Section style={style} $index={index}>
      {children}
    </Section>
  );
}

function NextBtn({
  style,
  positionX = "right",
  positionY = "center",
  disabled,
  icon,
}) {
  const { next, index, total, hideWhenCurrentSlide } = useCarousel();
  if (hideWhenCurrentSlide && index + 1 === total) return;
  return (
    <BtnContainer style={style} positionX={positionX} positionY={positionY}>
      <ButtonIcon
        type="button"
        disabled={disabled}
        action={() => next()}
        variant="text"
        size="rounded"
        icon={
          <HiArrowRight
            style={{
              opacity: disabled ? 0.3 : 1,
              pointerEvents: disabled ? "none" : "auto",
            }}
          />
        }
      />
    </BtnContainer>
  );
}

function PrevBtn({ positionX = "left", positionY = "center", style }) {
  const { prev, index, hideWhenCurrentSlide } = useCarousel();
  if (hideWhenCurrentSlide && index === 0) return;
  return (
    <BtnContainer style={style} positionX={positionX} positionY={positionY}>
      <ButtonIcon
        type="button"
        action={() => prev()}
        size="rounded"
        variant="text"
        icon={<HiArrowLeft />}
      ></ButtonIcon>
    </BtnContainer>
  );
}

function Card({ children, style }) {
  return <CardContainer style={style}>{children}</CardContainer>;
}

function Tracker({ type }) {
  const { index, total } = useCarousel();
  return (
    <TrackerContainer>
      <TrackerContainer $type={type}>
        {Array.from({ length: total }).map((_, i) => (
          <StepBar
            $type={type}
            key={i}
            $active={type === "img" ? i === index : i <= index}
          />
        ))}
      </TrackerContainer>
    </TrackerContainer>
  );
}

export default Carousel;
const positionX = {
  left: css`
    left: 0;
  `,

  right: css`
    right: 0;
  `,
};

const positionY = {
  center: css`
    top: 50%;
  `,

  top: css`
    top: 0%;
  `,

  bottom: css`
    bottom: 0%;
  `,
};

const Container = styled.div`
  & * {
    color: var(--text-color);
  }
  position: relative;
`;
const Section = styled.div`
  //overflow: hidden;
  width: 100%;
  display: flex;
  transform: ${({ $index }) => `translateX(-${$index * 100}%)`};
  transition: transform 0.5s ease;
`;

const BtnContainer = styled.div`
  position: absolute;
  ${(props) => positionX[props.positionX]}
  ${(props) => positionY[props.positionY]}
`;
const CardContainer = styled.div`
  min-width: 100%;
  flex-shrink: 0;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 800px) {
    width: 80%;

    min-width: none;
  }
`;

const TrackerContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  margin-top: 8px;

  ${({ $type }) =>
    $type === "img"
      ? css`
          justify-content: center;
          align-items: center;
        `
      : css``}
`;
const StepBar = styled.div`
  transition: background-color 0.3s ease;

  ${({ $type }) =>
    $type === "img"
      ? css`
          /* Circle Styles */
          width: 8px; /* Fixed width */
          height: 8px; /* Fixed height (same as width) */
          border-radius: 50%; /* Makes it a circle */
          flex: 0 0 auto; /* Prevents it from stretching */
          background-color: ${({ $active }) =>
            $active ? "rgb(250, 250, 250)" : "var(--hover-color)"};
        `
      : css`
          /* Bar (Default) Styles */
          height: 4px;
          border-radius: 2px;
          flex: 1; /* Stretches to fill space */
          background-color: ${({ $active }) =>
            $active ? "rgb(17, 127, 195)" : "var(--hover-color)"};
        `}
`;
Carousel.Track = Track;
Carousel.Card = Card;
Carousel.NextBtn = NextBtn;
Carousel.PrevBtn = PrevBtn;
Carousel.Tracker = Tracker;
