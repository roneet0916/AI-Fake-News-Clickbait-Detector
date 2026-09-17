import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Go Home
        </a>
      </main>
      <Footer />
    </>
  );
}
