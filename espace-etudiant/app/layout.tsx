import type { Metadata } from "next";
import { Geist, Geist_Mono, Staatliches } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const staatliches = Staatliches({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Espace Étudiant — UCKIN",
  description: "Portail étudiant de l'Université Chrétienne de Kinshasa",
  icons: {
    icon: "/images/faviconn.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${staatliches.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
