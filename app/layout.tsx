import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
const serif = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: "QRIM — QR Code Generator",
  description: "Create beautiful, high-quality QR Codes from any link. Generated locally in your browser.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>);
}
