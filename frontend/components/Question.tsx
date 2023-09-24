import React from "react";
import {
  Box,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Center,
  Button,
} from "@chakra-ui/react";

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionProps {
  questionData: QuestionData;
}

const Question: React.FC<QuestionProps> = ({ questionData }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Text fontSize="xl" mb={4}>
        {questionData.question}
      </Text>
      <RadioGroup defaultValue="" mt={2}>
        <Stack spacing={2}>
          {questionData.options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button>Submit</Button>
    </Flex>
  );
};

export default Question;
