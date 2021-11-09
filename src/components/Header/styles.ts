import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
  width: 100vw;
`;

export const Content = styled.div`
  padding: 2rem 1rem 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 380px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
