import React from "react";

import Toast from "@components/toast/Toast";

const initialState: TInitialState = {
  message: null,
  showToast: (_: string) => {},
};

type TInitialState = {
  message: string | null;
  showToast: (message: string) => void;
};

const ToastContext = React.createContext<TInitialState>({
  message: null,
  showToast: (_: string) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = React.useState(initialState.message);

  const showToast = (message: string) => {
    setMessage(message);
  };

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {message && <Toast message={message} setMessage={setMessage} />}
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return React.useContext(ToastContext);
};
