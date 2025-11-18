// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import MainHeader from "@/components/common/main-header";
import MainFooter from "@/components/common/main-footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MELHOR PokeNext - Pokédex",
  description: "Pokédex não oficial construída com Next.js e PokéAPI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.className} bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-linear-to-b from-slate-950 via-slate-950 to-slate-900">
          <MainHeader />

          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
          </main>

          <MainFooter />
        </div>
      </body>
    </html>
  );
}
