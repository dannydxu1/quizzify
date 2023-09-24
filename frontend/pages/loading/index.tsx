import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner, Center, Text, Input } from "@chakra-ui/react";
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
    <Center>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : error ? (
        <>
          <Text>{error}</Text>
        </>
      ) : null}
    </Center>
  );
};

export default LoadingPage;
