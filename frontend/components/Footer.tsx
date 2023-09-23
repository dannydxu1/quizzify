import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Link,
  IconButton,
  Image,
  Center,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

//TODO: Add username and make prettier
interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

const Footer: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/dannydxu1/quizzify/contributors"
        );
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    }
    fetchContributors();
  }, []);

  return (
    <Box bg="teal.700" color="white" py={4}>
      <Center>
        <Text fontWeight="bold">Contributors:&nbsp;</Text>
        <Text>{" "}</Text>
        <Flex>
          {contributors.map((contributor, index) => (
            <Link key={index} href={contributor.html_url} isExternal>
              <Image
                boxSize="50px"
                borderRadius="full"
                src={contributor.avatar_url}
                alt={contributor.login}
                mr={2}
              />
            </Link>
          ))}
        </Flex>
      </Center>
    </Box>
  );
};

export default Footer;
