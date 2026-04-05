import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudhakar | Data Science & Full Stack",
  description: "Engineering the Future of AI & Data. Portfolio of Sudhakar, Data Science Student Class of 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-[var(--color-primary-accent)]/30`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
