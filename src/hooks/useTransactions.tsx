import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date | string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
  deleteTransaction: (transaction: Transaction) => void;
  editTransaction: (transaction: Transaction) => void;
  toEditTransaction: Transaction;
  setToEditTransaction: (transaction: Transaction) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [toEditTransaction, setToEditTransaction] = useState<Transaction>(
    {} as Transaction
  );

  useEffect(() => {
    if (localStorage.getItem('transactions') === null) {
      setTransactions([]);
      return;
    }

    const localTransactions = JSON.parse(
      localStorage.getItem('transactions') ?? ''
    );
    setTransactions(localTransactions);
  }, []);

  function createTransaction(transactionInput: TransactionInput) {
    const transaction = {
      ...transactionInput,
      createdAt: new Date(),
      id: transactions.length + 1,
    };

    const allTransactions = [...transactions, transaction];

    localStorage.setItem('transactions', JSON.stringify(allTransactions));

    setTransactions([...transactions, transaction]);
  }

  function deleteTransaction(transaction: Transaction) {
    const deletedId = transaction.id;
    const filteredTransactions = transactions.filter(
      (obj) => obj.id !== deletedId
    );
    localStorage.setItem('transactions', JSON.stringify(filteredTransactions));

    setTransactions(filteredTransactions);
  }

  function editTransaction(transaction: Transaction) {
    if (localStorage.getItem('transactions') === null) return;
    if (transactions.length < 1) return;
    if (!toEditTransaction) return;
    if (!transactions.find((exchange) => exchange.id === transaction.id)) return;
    const otherTransactions = transactions.filter(
      (exchange) => exchange.id !== transaction.id
    );
    const editedTransaction = {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      createdAt: transaction.createdAt,
    };

    const allTransactions = [...otherTransactions, editedTransaction];

    localStorage.setItem('transactions', JSON.stringify(allTransactions));

    setTransactions(allTransactions);
    setToEditTransaction({} as Transaction);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        editTransaction,
        toEditTransaction,
        setToEditTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
