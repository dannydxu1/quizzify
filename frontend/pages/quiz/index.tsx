import {
  Box,
  Heading,
  Text,
  ChakraProvider,
  extendTheme,
  CSSReset,
} from "@chakra-ui/react";
import React from "react";

import Question from "../../components/Question";

const questionData = {
  question: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: "Paris",
};
const TemporaryPage = () => {
  return <Question questionData={questionData} />;
};

export default TemporaryPage;
