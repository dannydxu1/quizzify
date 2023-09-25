import { createContext, useContext, useState, ReactNode } from "react";
import { Question, QuizContextType } from "@/types/types";

interface QuizProviderProps {
  children: ReactNode;
}

interface QuizContextProps {
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const QuizContext = createContext<QuizContextProps>({
  questions: [],
  setQuestions: () => {},
});

export const useQuiz = (): QuizContextType => {
  return useContext(QuizContext);
};
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  return (
    <QuizContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
