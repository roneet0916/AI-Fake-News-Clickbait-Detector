import React from "react";

export const metadata = {
  title: "Dashboard — AI NewsGuard",
  description: "System metrics, accuracy benchmarks, and real-time detection statistics.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
