import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Button,
  VStack,
  Icon,
  Center,
  Progress, // Import the Progress component
} from "@chakra-ui/react";
import { MdHome } from "react-icons/md";

import QuizCard from "../../components/QuizCard";
import { Question, QuizContextType } from "../../types/types";
import { useInputText } from "../../components/InputTextContext";
import { useQuiz } from "@/components/QuizContext";

const QuizPage = () => {
  const { questions }: QuizContextType = useQuiz();
  console.log(questions); // Debugging line
  const initialDuration = 300;
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
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
  };

  const dummyQuestion2 = {
    question: "What is the capital of France?",
    options: ["England", "Paris", "Berlin", "Norway"],
    correctAnswer: "Paris",
  };

  const questionsArray: Question[] = questions.questions.questions;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" w="100%">
        {questionsArray.length === 0 ? (
          <Box />
        ) : (
          <Box>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              pr={10}
              color={formattedTime === "00:00" ? "red.500" : "inherit"}
            >
              Time Remaining: {formattedTime}
            </Text>
          </Box>
        )}
        {questionsArray.length === 0 ? (
          <Box>Warning</Box>
        ) : (
          <Box w="40vw" ml="-10%">
            <Progress
              value={progressPercentage}
              size="sm"
              height="20px"
              rounded="15"
            />
          </Box>
        )}
        <Box>
          <Link href="/">
            <Button
              colorScheme="transparent"
              color="black"
              leftIcon={<Icon as={MdHome} />}
            >
              Home
            </Button>
          </Link>
        </Box>
      </Flex>
      {questionsArray.length === 0 ? (
        <Box />
      ) : (
        <Center>
          <VStack>
            {questionsArray.map((questionItem, index) => (
              <QuizCard
                key={index}
                question={questionItem.question}
                options={questionItem.options}
                questionNumber={index + 1}
                correctAnswer={questionItem.correctAnswer}
              />
            ))}
          </VStack>
        </Center>
      )}
    </Box>
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
