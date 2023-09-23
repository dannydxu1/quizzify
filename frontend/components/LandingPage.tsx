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
} from "@chakra-ui/react";
import Typed from "typed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputText, setInputText] = useState("");

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

  const handleOptionClick = (option: string) => {
    console.log(`You chose ${option}`);
    onClose();
  };

  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, green.500)",
    "linear(to-r, teal.700, green.700)"
  );

  const handleClick = (action: string) => {
    console.log(`User clicked ${action}`);
  };

  const goToSettingsPage = () => {
    router.push({
      pathname: "/settings",
      query: { input: inputText },
    });
  };

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
              <Button colorScheme="undefined" onClick={onOpen}>
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

              <Modal isOpen={isOpen} onClose={onClose}>
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
                onClick={goToSettingsPage}
              />
              <Button
                bg="white"
                rounded="50"
                w="30"
                h="50"
                rightIcon={<FontAwesomeIcon icon={faArrowCircleRight} />}
                boxShadow="md"
              >
                Go
              </Button>
            </HStack>
          </VStack>
        </SlideFade>
      </Container>
    </Box>
  );
};

export default LandingPage;
