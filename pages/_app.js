import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ShoppingCartContextProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ShoppingCartContextProvider>
        <Component {...pageProps} />
      </ShoppingCartContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
