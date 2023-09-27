import styled from "styled-components";

export const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .nav-center {
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background-color: transparent;
    padding: 0;
    border: none;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;

    svg {
      display: block;
    }
  }

  .logo-text {
    display: none;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 100px;

    img {
      width: 100%;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    z-index: 99;

    .nav-center {
      width: 90%;
    }

    .logo {
      img {
        display: none;
      }
    }

    .logo-text {
      display: block;
    }
  }
`;
