import React from "react";

export const metadata = {
  title: "Analyze News — AI NewsGuard",
  description: "AI-powered fake news detection, clickbait scoring, and sentiment analysis.",
};

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
