import { css } from "styled-components";

/**
 * Styles for post and comment 
 */
export const variantSize = {
  post: css`
    font-size: 1rem;
    gap: 0.5rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      gap: 0.4rem;

      svg {
        width: 1rem;
        height: 1rem;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      gap: 0.3rem;

      svg {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  `,

  comment: css`
    font-size: 0.8rem;
    gap: 0.5rem;

    svg {
      width: 0.9rem;
      height: 0.8rem;
    }

    @media (max-width: 768px) {
      font-size: 0.75rem;
      gap: 0.4rem;

      svg {
        width: 0.8rem;
        height: 0.7rem;
      }
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
      gap: 0.3rem;

      svg {
        width: 0.7rem;
        height: 0.6rem;
      }
    }
  `,
};

