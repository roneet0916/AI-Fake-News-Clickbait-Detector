import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HistoryTable from "../components/HistoryTable";

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
        <p className="text-gray-600 mb-6">
          View and manage your past analyses. Click on any entry for detailed results.
        </p>
        <HistoryTable />
      </main>
      <Footer />
    </>
  );
}
