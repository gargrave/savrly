import { useToast } from "@chakra-ui/react";
import React from "react";

interface ToastConfig {
  description?: string;
  title?: string;
}

export function useToasty() {
  const toast = useToast();

  const successToast = React.useCallback(
    (config: ToastConfig) => {
      toast({
        isClosable: true,
        status: "success",
        ...config,
      });
    },
    [toast]
  );

  const errorToast = React.useCallback(
    (config: ToastConfig) => {
      toast({
        isClosable: true,
        status: "error",
        ...config,
      });
    },
    [toast]
  );

  return {
    errorToast,
    successToast,
  };
}
