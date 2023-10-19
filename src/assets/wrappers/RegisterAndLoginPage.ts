import styled from 'styled-components';

export const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  img {
    display: block;
    margin: 0 auto 1.5rem;
  }

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }

  .status-msg {
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: var(--letter-spacing);
  }

  .error-msg {
    color: var(--input-error);
  }

  .success-msg {
    color: var(--green-success);

    span {
      display: block;
    }
  }
`;
