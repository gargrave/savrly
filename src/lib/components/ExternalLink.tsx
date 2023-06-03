import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  href: string;
}

export default function ExternalLink({
  children,
  className = "",
  href,
}: Props) {
  return (
    <ChakraLink className={className} href={href} isExternal>
      {children}
    </ChakraLink>
  );
}
