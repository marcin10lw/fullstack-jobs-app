import styled from "styled-components";

export const Wrapper = styled.div`
  .input-wrapper {
    position: relative;

    button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--text-secondary-color);
      cursor: pointer;
    }

    svg {
      display: block;
    }
  }
`;
