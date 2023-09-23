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

const LandingPage: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const typed = new Typed("#typed-element", {
      strings: ["Turn boring lectures into interactive quizzes."],
      typeSpeed: 35,
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
          <VStack spacing="3">
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
                  <ModalHeader>Alternative Transcript Input</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Button onClick={() => handleOptionClick("Option 1")} mb="5">
                      Upload Lecture Transcript
                    </Button>
                    <Button onClick={() => handleOptionClick("Option 2")}>
                    Record Live Lecture
                    </Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Input
                placeholder="Paste a lecture transcript."
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
              >
                Go
              </Button>
            </HStack>

            {/* <HStack spacing={4}>
              <Button
                colorScheme="whiteAlpha"
                onClick={() => handleClick("Upload")}
                rounded="50"
                w="45%"
              >
                Upload
              </Button>
              <Text>|</Text>
              <Button
                colorScheme="whiteAlpha"
                onClick={() => handleClick("Record")}
                rounded="50"
                w="45%"
              >
                Record
              </Button>
            </HStack> */}
          </VStack>
        </SlideFade>
      </Container>
    </Box>
  );
};

export default LandingPage;
