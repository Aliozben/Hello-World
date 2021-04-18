import React, {useState} from "react";
import Toast from "../components/Toast";

//type ToastType = "warning" | "error" | "info";
export const ToastContext = React.createContext<{
  toasts: string[];
  setToasts: React.Dispatch<React.SetStateAction<string[]>> | null;
  addToast: (text: string) => void;
}>({toasts: [], setToasts: null, addToast: () => {}});

interface Props {}
const ToastProvider: React.FC<Props> = ({children}) => {
  const [toasts, setToasts] = useState<string[]>([]);
  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        addToast: (newToast: string) => {
          setToasts([...toasts, newToast]);
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
export default ToastProvider;
