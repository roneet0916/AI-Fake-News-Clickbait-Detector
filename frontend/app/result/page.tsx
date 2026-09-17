"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ResultDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/analyze");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-8">
        <p className="text-gray-500">Redirecting to Analysis interface...</p>
      </main>
      <Footer />
    </div>
  );
}
