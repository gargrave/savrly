"use client";

import Link from "next/link";

import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <>
      <Heading as={"h1"}>SAVRLY</Heading>
      <UnorderedList>
        <ListItem>
          <Link href={"/bookmarks"}>Bookmarks</Link>
        </ListItem>
      </UnorderedList>
    </>
  );
}
