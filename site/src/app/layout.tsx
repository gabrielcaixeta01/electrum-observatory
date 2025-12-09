import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Electrum Observatory",
  description: "Mapping the global Electrum server network and analyzing privacy risks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white antialiased">
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}