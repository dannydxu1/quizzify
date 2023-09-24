import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Center,
  useColorModeValue,
  SlideFade,
  Input,
  Divider,
  FormControl,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
} from "@chakra-ui/react";
import Typed from "typed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useInputText } from "./InputTextContext"; // Import this line

import SettingsModal from "./SettingsModal";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const {
    isOpen: isInputModalOpen,
    onOpen: inputModalOnOpen,
    onClose: inputModalOnClose,
  } = useDisclosure();

  const {
    isOpen: isQuizSettingsModalOpen,
    onOpen: quizSettingsModalOnOpen,
    onClose: quizSettingsModalOnClose,
  } = useDisclosure();
  const { inputText, setInputText } = useInputText();

  useEffect(() => {
    const typed = new Typed("#typed-element", {
      strings: ["Turn boring lectures into interactive quizzes."],
      typeSpeed: 23,
      showCursor: true,
      loop: false,
      onComplete: () => setShowButtons(true),
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleGoButtonClick = () => {
    setInputText(inputText); // Assuming you've imported useInputText
    router.push("/loading");
  };

  const handleOptionClick = (option: string) => {
    console.log(`You chose ${option}`);
    inputModalOnClose();
  };

  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, green.500)",
    "linear(to-r, teal.700, green.700)"
  );

  return (
    <Box
      h="100vh"
      bgGradient={bgGradient}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Container centerContent maxWidth="80%" mt={-60}>
        <Heading as="h1" size="4xl" textAlign="center" mb={15}>
          <span id="typed-element"></span>
        </Heading>
        <SlideFade
          in={showButtons}
          offsetY="20px"
          transition={{ enter: { duration: 1 } }}
        >
          <VStack spacing="3" mt={30}>
            <HStack>
              <Button colorScheme="undefined" onClick={inputModalOnOpen}>
                <Box
                  bg="white"
                  p={2}
                  w="35px"
                  h="35px"
                  rounded="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="md"
                  mr={-4}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} color="black" />
                </Box>
              </Button>

              <Modal isOpen={isInputModalOpen} onClose={inputModalOnClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    Select an Alternate Transcript Input
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody mb={4}>
                    <HStack spacing={4}>
                      {" "}
                      <Button onClick={() => handleOptionClick("Option 1")}>
                        Upload Lecture Transcript
                      </Button>
                      <Button onClick={() => handleOptionClick("Option 2")}>
                        Record Lecture
                      </Button>
                    </HStack>
                  </ModalBody>
                </ModalContent>
              </Modal>

              <Input
                placeholder="Paste a lecture transcript."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                h="50"
                w="400"
                rounded="60"
                bg="white"
                color="black"
                focusBorderColor="white"
                boxShadow="md"
              />
              <Button
                bg="white"
                rounded="50"
                w="30"
                h="50"
                rightIcon={<FontAwesomeIcon icon={faArrowCircleRight} />}
                boxShadow="md"
                // TODO: change back onClick={quizSettingsModalOnOpen}
                onClick={handleGoButtonClick}
              >
                Go
              </Button>
            </HStack>
            <SettingsModal
              transcriptInputString={inputText}
              isOpen={isQuizSettingsModalOpen}
              onOpen={quizSettingsModalOnOpen}
              onClose={quizSettingsModalOnClose}
            ></SettingsModal>
          </VStack>
        </SlideFade>
      </Container>
    </Box>
  );
};

export default LandingPage;
