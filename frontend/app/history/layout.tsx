import React from "react";

export const metadata = {
  title: "Analysis History — AI NewsGuard",
  description: "View and manage past news analysis evaluation records.",
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
