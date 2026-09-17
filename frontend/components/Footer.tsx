export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">AI NewsGuard</h3>
            <p className="text-gray-400 text-sm">
              AI-powered fake news and clickbait detection system.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Quick Links</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li><a href="/analyze" className="hover:text-white transition-colors">Analyze</a></li>
              <li><a href="/history" className="hover:text-white transition-colors">History</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">Methodology</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Disclaimer</h4>
            <p className="text-gray-400 text-xs">
              This system provides ML-based predictions only. It is not independent fact verification.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
          © 2026 AI NewsGuard — College AI/ML Project
        </div>
      </div>
    </footer>
  );
}
