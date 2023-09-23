import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 20px);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    border-radius: var(--border-radius);
    background: var(--primary-500);
  }

  .dropdown-btn {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
  }
`;
