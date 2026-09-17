"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MethodologyContent from "../../components/MethodologyContent";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Methodology & System Architecture</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Technical specifications, feature extraction models, and evaluation performance metrics.
        </p>
        <MethodologyContent />
      </main>
      <Footer />
    </div>
  );
}
