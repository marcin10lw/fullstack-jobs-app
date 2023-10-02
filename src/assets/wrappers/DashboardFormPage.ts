import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .avatar-container {
    position: relative;
    width: 200px;
    height: 200px;

    input {
      display: none;
    }

    .avatar-info {
      top: calc(100% + 0.3rem);
      text-align: center;
    }
  }

  .avatar-label {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-overlay {
      position: absolute;
      left: 0;
      top: 0;
      inset: 0;
      z-index: 9;
      background-color: black;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);
      display: grid;
      place-items: center;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }

    &:hover .avatar-overlay {
      opacity: 0.4;
    }
  }

  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    position: relative;
    margin-bottom: 0;
    height: 100%;
  }

  .form-error {
    position: absolute;
    left: 0;
    width: 100%;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
    margin-top: 3rem;
  }

  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  .form-select,
  .form-input,
  .form-btn {
    height: 38px;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2rem 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
