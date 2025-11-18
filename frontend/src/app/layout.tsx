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
  title: "Pokédex - Oficial",
  description: "Pokédex criada para ajudar você treinador na sua jornada!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {/* fundo muda conforme a classe `dark` no <html> */}
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
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
