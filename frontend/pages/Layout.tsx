import React from "react";
import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer"; // make sure the path is correct

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
