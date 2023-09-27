import styled from "styled-components";

export const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }

  .info {
    h5 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    margin: 1rem 0 1.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    display: grid;
    place-items: center;
    width: 100px;
    height: 30px;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }

  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export const JobInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;

    svg {
      color: var(--text-secondary-color);
    }
  }

  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
