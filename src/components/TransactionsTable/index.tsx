import { TiDeleteOutline } from 'react-icons/ti';
import { MdModeEditOutline } from 'react-icons/md';
import { Container } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date | string;
}
interface TransactionTrableProps {
  openEditTransaction: () => void;
}

export function TransactionTable({
  openEditTransaction,
}: TransactionTrableProps) {
  const { transactions, deleteTransaction, setToEditTransaction } = useTransactions();

  console.log(transactions);

  function handleOpenEdit(transaction: Transaction) {
    setToEditTransaction(transaction);
    openEditTransaction();
  }

  return (
    <Container>
      <table>
        <thead>
          <tr className="columns">
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td>
                <div className="actionsButtonsContainer">
                  <button
                    className="tableActionButton"
                    type="button"
                    onClick={() => deleteTransaction(transaction)}
                  >
                    <TiDeleteOutline className="iconDelete" />
                  </button>

                  <button
                    className="tableActionButton"
                    type="button"
                    onClick={() => handleOpenEdit(transaction)}
                  >
                    <MdModeEditOutline className="iconEdit" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
