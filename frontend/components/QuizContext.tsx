import { createContext, useContext, useState, ReactNode } from "react";
import { Question, QuizContextType } from "@/types/types";

interface QuizProviderProps {
  children: ReactNode;
}

// Changed `any[]` to `Question[]` here
interface QuizContextProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuizContext = createContext<QuizContextProps>({
  questions: [],
  setQuestions: () => {},
});

// Changed the return type to QuizContextProps
export const useQuiz = (): QuizContextProps => {
  return useContext(QuizContext);
};

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  return (
    <QuizContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
