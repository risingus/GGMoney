import { FormEvent, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImag from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface newTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date | string;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: newTransactionModalProps) {
  const {
    createTransaction,
    toEditTransaction,
    editTransaction,
    setToEditTransaction,
  } = useTransactions();
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (toEditTransaction?.id) {
      setType(toEditTransaction.type);
      setTitle(toEditTransaction.title);
      setCategory(toEditTransaction.category);
      setAmount(toEditTransaction.amount);
    }
  }, [toEditTransaction]);

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle('');
    setType('deposit');
    setCategory('');
    setAmount(0);
    onRequestClose();
  }

  function handleSaveEditedTransaction(event: FormEvent) {
    event.preventDefault();
    const editedTransaction = {
      id: toEditTransaction.id,
      title,
      category,
      amount,
      createdAt: toEditTransaction.createdAt,
      type,
    };

    editTransaction(editedTransaction);
    setTitle('');
    setType('deposit');
    setCategory('');
    setAmount(0);
    onRequestClose();
  }

  function handleCloseModal() {
    setTitle('');
    setType('deposit');
    setCategory('');
    setAmount(0);
    setToEditTransaction({} as Transaction);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className="react-modal-close"
      >
        <img src={closeImag} alt="Fechar Modal" />
      </button>

      <Container
        onSubmit={
          !toEditTransaction?.id
            ? handleCreateNewTransaction
            : handleSaveEditedTransaction
        }
      >
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType('deposit');
            }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setType('withdraw');
            }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />

            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">
          {!toEditTransaction?.id ? 'Cadastrar' : 'Salvar'}
        </button>
      </Container>
    </Modal>
  );
}
