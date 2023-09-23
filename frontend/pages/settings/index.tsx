import {
  Box,
  Center,
  FormControl,
  HStack,
  RangeSlider,
  Text,
  VStack,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
} from "@chakra-ui/react";
import React, { useState, WheelEvent, useEffect } from "react";
import { NextPage } from "next";
import questions from "./questions.json";

const AboutPage: NextPage = () => {
  return (
    <Box minH="100vh" bg="gray.300">
      <FormControl>
        <Center p="10%">
          <Box w="50%">
            <VStack bg="whiteAlpha.400" p="5%" rounded="10" boxShadow="md">
              {questions.map((question, i) => (
                <Text fontSize="2xl" fontWeight="bold" textColor="teal.500">
                  {question.question}
                </Text>
              ))}
            </VStack>
          </Box>
        </Center>
      </FormControl>
    </Box>
  );
};

export default AboutPage;
