import { createContext, useContext, useState, ReactNode } from "react";
import { useStateContext } from "./Web3";

interface ModalContextType {
  showModal: () => void;
  hideModal: () => void;
  isModalVisible: boolean;
  address: string | undefined;
  balance: string | undefined;
  symbol: string | undefined;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { address, balance, symbol } = useStateContext();

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, isModalVisible, address, balance, symbol }}
    >
      {children}
    </ModalContext.Provider>
  );
};
