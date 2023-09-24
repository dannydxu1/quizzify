import { Box, Divider, Text, VStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { Question } from "../types/types";

//represents a single question with its associated answers
interface QuizCardProps {
  question: string;
  options: string[];
  questionNumber: number;
  correctAnswer: String;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  questionNumber,
  correctAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (selectedOption !== null) {
      setIsCorrect(selectedOption === correctAnswer);
    }
  }, [selectedOption, correctAnswer]);

  const handleOptionClick = (option: string) => {
    if (isCorrect) {
      return;
    }
    setSelectedOption(option);
  };

  return (
    <Box
      w="90vh"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      my={5}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          {question}
        </Text>
        <Text
          fontSize="xl"
          fontWeight="bold"
          bgGradient="linear(to-l, teal.500, green.500)"
          bgClip="text"
        >
          {`Q.${questionNumber}`}
        </Text>
      </Flex>
      <Divider my={4} />
      <VStack spacing={3} alignItems="stretch">
        {options.map((option, index) => {
          // Determine the background color
          const bgColor =
            option === selectedOption
              ? isCorrect
                ? "green.100"
                : "red.100"
              : "transparent";

          // Determine the hover color based on the background color
          const hoverBg =
            bgColor === "green.100" || bgColor === "red.100"
              ? bgColor
              : "gray.100";

          return (
            <Box
              key={index}
              p={3}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: hoverBg }} // Apply the hover color
              bg={bgColor}
              color={
                option === selectedOption
                  ? isCorrect
                    ? "green.800"
                    : "red.800"
                  : "black"
              }
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default QuizCard;
