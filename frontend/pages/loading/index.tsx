import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner, Center, Text, Input, HStack } from "@chakra-ui/react";
import { useInputText } from "../../components/InputTextContext";

const LoadingPage: React.FC = () => {
  const router = useRouter();
  const { inputText, setInputText } = useInputText();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String>("");

  useEffect(() => {
    const url = "http://localhost:8000/post_example";
    const payload = {
      transcript: inputText,
    };
    console.log("Sending request to backend");
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
        router.push("/quiz"); // Navigate only if the request is successful
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inputText, router]);

  return (
    <Center h="80vh">
      {loading ? (
        <HStack>
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-l, teal.500, green.500)"
            bgClip="text"
          >
            Loading...
          </Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="teal.400"
            color="green.500"
            size="xl"
          />
        </HStack>
      ) : error ? (
        <>
          <Text>{error}</Text>
        </>
      ) : null}
    </Center>
  );
};

export default LoadingPage;
