import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../components/theme";

import Layout from "./Layout";
import { InputTextProvider } from "@/components/InputTextContext";

//root of app, ignore
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <InputTextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InputTextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
