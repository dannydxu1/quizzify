import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  ChakraProvider,
  extendTheme,
  CSSReset,
  VStack,
  Center,
  Progress, // Import the Progress component
} from "@chakra-ui/react";

import Question from "../../components/Question";
import QuizCard from "../../components/QuizCard";

const questionData = {
  question: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: "Paris",
};
const QuizPage = () => {
  const initialDuration = 300; // Set the initial duration in seconds
  const [seconds, setSeconds] = useState(initialDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formattedTime = formatTime(seconds);

  // Calculate the progress percentage
  const progressPercentage =
    ((initialDuration - seconds) / initialDuration) * 100;

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
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Quiz Timer
        </Heading>
        <Text fontSize="lg">Time remaining: {formattedTime}</Text>
        {/* Add your quiz content here */}
      </Box>
      <VStack>
        {questionsArray.map((questionItem, index) => (
          <QuizCard
            key={index}
            question={questionItem.question}
            options={questionItem.options}
            questionNumber={index + 1}
          />
        ))}
      </VStack>
      <Center>
        <Box width={800} justifyContent="flex-start">
          <Progress
            value={progressPercentage}
            size="sm"
            height="20px"
            rounded="15"
          />
        </Box>
      </Center>
    </ChakraProvider>
  );
};

// Helper function to format seconds into MM:SS
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default QuizPage;
