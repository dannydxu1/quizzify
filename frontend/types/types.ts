export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export interface QuizContextType {
  questions: {
    questions: Question[];
  };
}