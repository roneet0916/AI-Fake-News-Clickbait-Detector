import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardContent from "../components/DashboardContent";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">System Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Overview of model performance and system statistics.
        </p>
        <DashboardContent />
      </main>
      <Footer />
    </>
  );
}
