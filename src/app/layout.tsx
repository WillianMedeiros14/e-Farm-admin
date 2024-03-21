import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Footer } from "@/components/molecules/footer";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/molecules/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Farmas Admin",
  description: "Gerencie os produtos de sua farmácia em um único lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={cn(
          "flex min-h-screen bg-background font-sans antialiased flex-col justify-between",
          inter.className
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
