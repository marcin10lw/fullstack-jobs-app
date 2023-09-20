import styled from "styled-components";

export const Wrapper = styled.main`
  width: var(--fluid-width);
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 600px;
    display: block;
    margin: -3rem 0 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-bottom: 0.5rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;
