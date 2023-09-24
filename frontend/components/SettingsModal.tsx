import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  Checkbox,
} from "@chakra-ui/react";

interface SettingsModalProps {
  transcriptInputString: string;
  isOpen: boolean;
  onOpen: (option: string) => void;
  onClose: () => void;
}

interface FormField {
  question: string;
  type: string;
  options: string[];
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  transcriptInputString,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({});
  const handleOptionChange = (value: String, field: FormField) => {
    setFormData({
      ...formData,
      [field.question]: value,
    });
  };
  const router = useRouter();
  const handleClick = async () => {
    const url = "http://your-api-endpoint";
    const payload = {
      formData,
      transcript: transcriptInputString,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    
    router.push("./quiz");
  };

  const formFields: FormField[] = [
    {
      question: "How many questions for this quiz?",
      type: "radio",
      options: ["3", "5", "10"],
    },
    {
      question: "Time limit (sec) per question?",
      type: "radio",
      options: ["10", "30", "60", "120"],
    },
    {
      question: "Enable free response questions?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      question: "Randomize the question order?",
      type: "radio",
      options: ["Yes", "No"],
    },
  ];

  const allFieldsFilled = Object.keys(formData).length === formFields.length;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Quiz Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <VStack bg="whiteAlpha.400" p="5%" rounded="10" boxShadow="md">
            {formFields.map((field, index) => (
              <FormControl key={index}>
                <FormLabel>{field.question}</FormLabel>
                {field.type === "radio" && (
                  <RadioGroup onChange={(e) => handleOptionChange(e, field)}>
                    <HStack spacing="24px">
                      {field.options.map((option, i) => (
                        <Radio key={i} value={option} colorScheme="teal">
                          {option}
                        </Radio>
                      ))}
                    </HStack>
                  </RadioGroup>
                )}
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            isDisabled={!allFieldsFilled}
            onClick={() => {
              console.log(transcriptInputString);
              console.log(formData);
              handleClick();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
