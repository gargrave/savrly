import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function UiSection({ children }: Props) {
  return <section className={"p-4 bg-gray-700 m-4"}>{children}</section>;
}
