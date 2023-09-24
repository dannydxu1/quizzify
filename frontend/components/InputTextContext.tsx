import React, { createContext, useContext, useState, ReactNode } from "react";

interface InputTextProviderProps {
  children: ReactNode;
}

const InputTextContext = createContext<
  | {
      inputText: string;
      setInputText: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export const useInputText = () => {
  const context = useContext(InputTextContext);
  if (!context) {
    throw new Error("useInputText must be used within a InputTextProvider");
  }
  return context;
};

export const InputTextProvider: React.FC<InputTextProviderProps> = ({
  children,
}) => {
  const [inputText, setInputText] = useState("");
  return (
    <InputTextContext.Provider value={{ inputText, setInputText }}>
      {children}
    </InputTextContext.Provider>
  );
};
