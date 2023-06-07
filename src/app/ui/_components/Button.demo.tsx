import React from "react";
import { Divider, Heading, Text } from "@chakra-ui/react";

import { Button, ExternalLink } from "@/lib/components";
import { useToasty } from "@/lib/hooks";
import UiSection from "./UiSection";

export default function ButtonDemo() {
  const { errorToast, successToast } = useToasty();

  return (
    <UiSection>
      <Heading as={"h2"} size={"lg"}>
        Button
      </Heading>
      <p>
        Based on{" "}
        <ExternalLink href={"https://chakra-ui.com/docs/components/button"}>
          Chakra UI Button
        </ExternalLink>
      </p>

      <Divider />

      <div className={"mt-4"}>
        <Heading as={"h3"} size={"md"}>
          Confirm Button
        </Heading>
        <Text>Require a 2nd click to confirm an action.</Text>

        <div className={"mt-2 flex flex-wrap gap-1.5"}>
          <Button
            colorScheme={"red"}
            confirmText={"Confirm?"}
            onClick={() => successToast({ title: "Thingy deleted!" })}
            onConfirmTimeout={() => errorToast({ title: "Not fast enough!" })}
          >
            Delete
          </Button>
        </div>
      </div>
    </UiSection>
  );
}
