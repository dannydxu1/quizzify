export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export interface QuizContextType {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}
