
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FloatChat - AI-Powered Ocean Data Explorer",
  description: "Explore ARGO float data through natural language conversations. Ask questions, visualize patterns, and unlock insights from the world's oceans with AI.",
  keywords: ["ocean data", "ARGO floats", "oceanography", "AI", "data visualization", "marine science"],
  authors: [{ name: "FloatChat Team" }],
  openGraph: {
    title: "FloatChat - AI-Powered Ocean Data Explorer",
    description: "Explore ARGO float data through natural language conversations",
    type: "website",
    url: "https://floatchat.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FloatChat - Ocean Data Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FloatChat - AI-Powered Ocean Data Explorer",
    description: "Explore ARGO float data through natural language conversations",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
