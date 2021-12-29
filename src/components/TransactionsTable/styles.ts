import styled from 'styled-components';

export const Container = styled.div`
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);

      &:first-child {
        color: var(--text-title);
        border-bottom-left-radius: 0.4rem;
        border-top-left-radius: 0.4rem;
      }

      &:last-child {
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }

    @media (max-width: 592px) {
      .columns {
        th:nth-child(1),
        th:nth-child(3) {
          display: none;
        }
      }

      tbody {
        tr {
          td:nth-child(1),
          td:nth-child(3) {
            display: none;
          }

          td:nth-child(2) {
            border-bottom-left-radius: 0.4rem;
            border-top-left-radius: 0.4rem;
          }
        }
      }
    }

    @media (max-width: 372px) {
      .columns {
        th:nth-child(4) {
          display: none;
        }
      }

      tbody {
        tr {
          td:nth-child(4) {
            display: none;
          }
        }
      }
    }
  }

  .actionsButtonsContainer {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.3rem;

    .tableActionButton {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: 0.4rem;
      padding: 0.5rem;

      .iconDelete {
        color: var(--red);
        font-size: 1.2rem;
      }

      .iconEdit {
        font-size: 1.2rem;
      }

      :hover {
        background: rgba(0, 0, 0, 0.1);

        .iconDelete {
          color: rgba(300, 46, 77, 1);
        }
      }
    }
  }
`;
