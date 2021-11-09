import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

interface Transaction {
  id: any;
  title: any;
  amount: any;
  type: any;
  category: any;
  createdAt: any;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: any;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  async function createTransaction(transactionInput: TransactionInput) {
    const transaction = {
      ...transactionInput,
      createdAt: new Date(),
      id: transactions.length + 1,
    };

    const allTransactions = [...transactions, transaction];

    localStorage.setItem('transactions', JSON.stringify(allTransactions));

    setTransactions([...transactions, transaction]);
  }

  function deleteTransaction(transaction: any) {
    const deletedId = transaction.id;
    const filteredTransactions = transactions.filter(
      (obj) => obj.id !== deletedId
    );
    localStorage.setItem('transactions', JSON.stringify(filteredTransactions));

    setTransactions(filteredTransactions);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
