import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  ChakraProvider,
  extendTheme,
  CSSReset,
  Progress, // Import the Progress component
} from "@chakra-ui/react";

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
      <Box width={800} alignItems="center" justifyContent="flex-end">
        <Progress
          value={progressPercentage}
          size="sm"
          height="20px"
          rounded="15"
          justifyContent="flex-end"
        />
      </Box>
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
