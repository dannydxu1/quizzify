import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/anybody";
import "@fontsource-variable/inter";

const theme = extendTheme({
  fonts: {
    body: "Inter Variable, sans-serif",
    heading: "Inter Variable, sans-serif",
    anybodyVariable: "Anybody Variable",
  },
  colors: {
    pink: "#ce80b3",
  },

  components: {
    Text: {
      baseStyle: {
        fontSize: "20px",
      },
    },
    Heading: {
      baseStyle: {
        fontSize: "30px",
      },
    },
    Input: {
      baseStyle: {
        _placeholder: {
          color: "blue.400",
        },
        _focus: {
          borderColor: "green.400",
        },
      },
    },
  },
});

export default theme;
