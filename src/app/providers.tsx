"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button, FormLabel, Heading, Input, Link, Modal } =
  chakraTheme.components;

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  components: {
    Button,
    FormLabel,
    Heading,
    Input,
    Link,
    Modal,
  },
  config,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
    </CacheProvider>
  );
}
