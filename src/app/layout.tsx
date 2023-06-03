import React from "react";
import { clsx } from "clsx";
import { Inter } from "next/font/google";

import "./globals.css";
import "./preflight-custom.css";

import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAVRLY",
  description: "Save some of the things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("dark:bg-zinc-900", inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
