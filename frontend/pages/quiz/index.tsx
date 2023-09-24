import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

import Question from "../../components/Question";
import QuizCard from "@/components/QuestionCard";

const questionData = {
  question: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: "Paris",
};
const TemporaryPage = () => {
  const dummyQuestion1 = {
    question: "What is 2 + 2?",
    options: [
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
    ],
  };

  const dummyQuestion2 = {
    question: "What is the capital of France?",
    options: [
      { label: "Berlin", value: "Berlin" },
      { label: "Madrid", value: "Madrid" },
      { label: "Paris", value: "Paris" },
      { label: "Rome", value: "Rome" },
    ],
  };

  const questionsArray = [dummyQuestion1, dummyQuestion2];

  return (
    <VStack>
      {questionsArray.map((questionItem, index) => (
        <QuizCard
          key={index}
          question={questionItem.question}
          options={questionItem.options}
          questionNumber={index+1}
        />
      ))}
    </VStack>
  );
};

export default TemporaryPage;
