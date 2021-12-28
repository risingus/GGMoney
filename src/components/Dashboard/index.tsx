import { Summary } from '../Summary';
import { TransactionTable } from '../TransactionsTable';
import { Container } from './styles';

interface DashBoardProps {
  handleOpenTransactionModal: () => void;
}

export function Dashboard({ handleOpenTransactionModal }: DashBoardProps) {
  return (
    <Container>
      <Summary />
      <TransactionTable openEditTransaction={handleOpenTransactionModal} />
    </Container>
  );
}
