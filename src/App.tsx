import Modal from 'react-modal';
import { useState } from 'react';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
        }}
      >
        <Header onOpenNewTransactionModal={handleOpenTransactionModal} />
        <Dashboard handleOpenTransactionModal={handleOpenTransactionModal} />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseTransactionModal}
        />
      </div>

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
