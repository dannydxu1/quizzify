import { Box, Divider, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import React from "react";


type Option = {
  label: string;
  value: string;
};

interface QuizCardProps {
  question: string;
  options: Option[];
  questionNumber: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  questionNumber,
}) => {
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
          >
            {option.label}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default QuizCard;
