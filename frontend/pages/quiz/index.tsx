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
import { Question } from "../../types/types";
//TODO: Add API call

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
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
  };

  const dummyQuestion2 = {
    question: "What is the capital of France?",
    options: ["England", "Paris", "Berlin", "Norway"],
    correctAnswer: "Paris",
  };

  //replace header
  const questionsArray: Question[] = [dummyQuestion1, dummyQuestion2];
  //move this back
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
          <Box mx="auto">
            <Center flex="1">
              <Box width={800} alignItems="center" justifyContent="flex-start">
                <Progress
                  value={progressPercentage}
                  size="sm"
                  height="20px"
                  rounded="15"
                />
              </Box>
            </Center>
          </Box>
        )}

        <Box>
          <Link href="/">
            <Button leftIcon={<Icon as={MdHome} />}>Home</Button>
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
