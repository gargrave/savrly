"use client";

import Link from "next/link";

import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={"flex flex-col items-center p-10 gap-5"}>
      <Heading as={"h1"}>SAVRLY</Heading>
      <UnorderedList>
        <ListItem>
          <Link href={"/bookmarks"}>Bookmarks</Link>
        </ListItem>
      </UnorderedList>
    </main>
  );
}
