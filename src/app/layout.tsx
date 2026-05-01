import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Pokedesk",
    template: "%s | Pokedesk",
  },
  description:
    "Pokedex escalable en Next.js con Clean Architecture y datos desacoplados de la PokéAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
