import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              AI-Powered News Analysis
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto text-balance">
              Detect fake news, identify clickbait, analyze sentiment, and classify
              news categories — all with explainable AI.
            </p>
            <Link
              href="/analyze"
              className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Analyze News Now
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "Fake News Detection",
                  desc: "ML-based classification with confidence scores and probability estimates.",
                },
                {
                  icon: "📰",
                  title: "Clickbait Detection",
                  desc: "Identifies sensational language, emotional words, and curiosity gaps.",
                },
                {
                  icon: "😊",
                  title: "Sentiment Analysis",
                  desc: "Detects positive, neutral, or negative sentiment in content.",
                },
                {
                  icon: "📂",
                  title: "Category Classification",
                  desc: "Classifies news into Technology, Sports, Business, Health, and more.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Enter News", desc: "Provide a headline or article text" },
                { step: "2", title: "AI Analysis", desc: "Multiple ML models analyze your text" },
                { step: "3", title: "Results", desc: "Get predictions with confidence scores" },
                { step: "4", title: "History", desc: "View and manage your past analyses" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-6">Important Limitations</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>ML predictions are based on patterns in training data, not factual verification</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>This system does not prove claims true or false</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Model accuracy depends on training data coverage and quality</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Use as a supplementary tool, not as the sole source of truth</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
