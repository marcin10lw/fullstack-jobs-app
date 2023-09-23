import styled from "styled-components";

export const Wrapper = styled.button`
  background: transparent;
  border: none;
  margin-right: 1rem;
  width: 1.5rem;
  aspect-ratio: 1;
  cursor: pointer;
  display: grid;
  place-items: center;

  svg {
    display: block;
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
