import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI NewsGuard — Fake News & Clickbait Analysis",
  description: "AI-powered fake news and clickbait detection with explainable analysis",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
