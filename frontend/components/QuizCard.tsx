import { Box, Divider, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface QuizCardProps {
  question: string;
  options: Option[];
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

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.value);
    setIsCorrect(option.value === correctAnswer);
  };

  return (
    <Box
      w="90%"
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
        {options.map((option, index) => (
          <Box
            key={index}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            _hover={{ bg: "gray.100" }}
            bg={
              option.value === selectedOption
                ? isCorrect
                  ? "green.100"
                  : "red.100"
                : "transparent"
            }
            color={
              option.value === selectedOption
                ? isCorrect
                  ? "green.800"
                  : "red.800"
                : "black"
            }
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default QuizCard;
