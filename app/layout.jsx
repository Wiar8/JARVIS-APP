import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jarvis - By Wiar8",
  description:
    "This is a simple voice-controlled personal assistant. It can do tasks like open a website, tell you the time, search for things on the internet, etc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
