export default function MethodologyContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">NLP Pipeline</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Unicode normalization and lowercasing</li>
          <li>Whitespace normalization and HTML stripping</li>
          <li>Tokenization using NLTK word_tokenize</li>
          <li>Stopword removal using NLTK stopwords corpus</li>
          <li>TF-IDF vectorization (fit on training data only)</li>
          <li>Classification via scikit-learn models</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Model Information</h2>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Fake News Classifier</h3>
            <p className="text-gray-600 text-sm">
              TF-IDF features with Logistic Regression (baseline) compared against
              Multinomial Naive Bayes. Model selection based on F1-score.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Clickbait Analyzer</h3>
            <p className="text-gray-600 text-sm">
              Interpretable headline feature extraction (exclamation marks,
              capitalization ratio, urgency words, emotional words, curiosity
              phrases) combined with heuristic scoring.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Sentiment Analyzer</h3>
            <p className="text-gray-600 text-sm">
              Lexicon-based sentiment analysis using positive/negative word lists.
              Output: Positive, Neutral, or Negative with a score.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Evaluation Metrics</h2>
        <p className="text-gray-600 mb-4">
          Models are evaluated using accuracy, precision, recall, and F1-score
          on a held-out test set. See the <a href="/dashboard" className="text-indigo-600 hover:underline">Dashboard</a> for results.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• ML predictions are pattern-based, not factual verification</li>
          <li>• Model performance depends on training data quality</li>
          <li>• Clickbait detection uses heuristic features</li>
          <li>• Category classification limited to predefined categories</li>
        </ul>
      </section>
    </div>
  );
}
