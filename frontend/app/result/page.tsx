import { useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResultDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to analyze if no ID
  if (!searchParams?.get("id")) {
    redirect("/analyze");
  }

  // For now, redirect to analyze since we need result data
  // In a real implementation we'd fetch by ID
  router.replace("/analyze");
  return null;
}

// Keep a fallback for direct result display from analysis
export function ResultDisplay({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">Analysis Complete</h2>
        <p className="text-indigo-100 text-sm">
          {result.title || "Untitled article"} — analyzed at {result.created_at || "just now"}
        </p>
      </div>
      {/* Result cards will be rendered here */}
      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
