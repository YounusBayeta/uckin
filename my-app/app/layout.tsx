import type { Metadata } from "next";
import { Geist, Geist_Mono, Staatliches } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import AOSProvider from "./components/AOSProvider";

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
  title: "Uckin — Sciences et progrès par la foi",
  description: "Uckin — Formations, Recherche, Admissions et Vie universitaire",
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
      <body className="min-h-full flex flex-col">
        <AOSProvider>
          <Navbar />
          {children}
          <Footer />
        </AOSProvider>
      </body>
    </html>
  );
}
