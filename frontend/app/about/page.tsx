import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MethodologyContent from "../components/MethodologyContent";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Methodology</h1>
        <p className="text-gray-600 mb-6">
          Technical details about our AI/ML pipeline, model selection, and evaluation.
        </p>
        <MethodologyContent />
      </main>
      <Footer />
    </>
  );
}
