import styled from "styled-components";

type WrapperProps = {
  color: string;
  bcg: string;
};

export const Wrapper = styled.article<WrapperProps>`
  padding: 2rem;
  background-color: var(--background-secondary-color);
  border-bottom: 5px solid ${({ bcg }) => bcg};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${({ color }) => color};
    line-height: 2;
  }

  .title {
    margin: 0.5rem 0 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: left;
    font-size: 1.25rem;
  }

  .icon {
    width: 70px;
    height: 60px;
    background-color: ${({ bcg }) => bcg};
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 2rem;
      color: ${({ color }) => color};
    }
  }
`;
