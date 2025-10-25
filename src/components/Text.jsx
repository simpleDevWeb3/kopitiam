import styled, { css } from "styled-components";

// Text type (color + weight)
const textType = {
  Title: css`
    font-weight: 700;
    color: var(--primary-color);
  `,
  Subhead: css`
    font-weight: 600;
    color: var(--secondary-color);
  `,
  Body: css`
    font-weight: 500;
    color: var(--text-color);
  `,
};

// Responsive font sizes per variant and type
const variantSize = {
  post: {
    Title: css`
      @media (min-width: 1300px) {
        font-size: 1.3rem;
      }
      @media (min-width: 600px) and (max-width: 900px) {
        font-size: 1.15rem;
      }
      @media (max-width: 468px) {
        font-size: 1.05rem;
      }
    `,
    Subhead: css`
      @media (min-width: 1300px) {
        font-size: 1.1rem;
      }
      @media (min-width: 600px) and (max-width: 900px) {
        font-size: 1rem;
      }
      @media (max-width: 468px) {
        font-size: 0.9rem;
      }
    `,
    Body: css`
      @media (min-width: 1300px) {
        font-size: 0.9rem;
      }
      @media (min-width: 600px) and (max-width: 900px) {
        font-size: 0.8rem;
      }
      @media (max-width: 468px) {
        font-size: 0.8rem;
      }
    `,
  },

  comment: {
    Title: css`
      @media (min-width: 1300px) {
        font-size: 1.5rem;
      }
      @media (min-width: 600px) and (max-width: 900px) {
        font-size: 1rem;
      }
      @media (max-width: 468px) {
        font-size: 0.9rem;
      }
    `,

    Body: css`
      @media (min-width: 1300px) {
        font-size: 0.9rem;
      }
      @media (min-width: 600px) and (max-width: 900px) {
        font-size: 0.9rem;
      }
      @media (max-width: 468px) {
        font-size: 0.8rem;
      }
    `,
  },
};

// Styled component
const StyledText = styled.p`
  margin: 0;
  ${({ $as }) => textType[$as] || textType.Body};
  ${({ $variant, $as }) =>
    (variantSize[$variant] && variantSize[$variant][$as]) ||
    variantSize.post.Body};
`;

// Text component
function Text({ as = "Body", variant = "post", children }) {
  return (
    <StyledText $as={as} $variant={variant}>
      {children}
    </StyledText>
  );
}

export default Text;
