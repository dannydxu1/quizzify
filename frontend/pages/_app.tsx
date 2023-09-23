import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../components/theme";

import Layout from "./Layout";

//root of app, ignore
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
