# AI NewsGuard — Viva/Presentation Preparation

## Concise Answers to Likely Questions

### What problem are you solving?
Detecting fake news and clickbait content online using AI/ML, providing explainable analysis with confidence scores.

### Why is this an AI/ML problem?
Because identifying fake news and clickbait requires pattern recognition at scale that humans cannot efficiently perform. ML models can learn patterns from labeled examples and generalize to new content.

### Why NLP?
News content is text. NLP enables extracting meaningful features from unstructured text for classification tasks like fake news detection, sentiment analysis, and categorization.

### What is TF-IDF?
Term Frequency-Inverse Document Frequency. It converts text into numerical vectors where each dimension represents a word's importance in a document relative to the entire corpus. Words common to all documents get lower weight; distinctive words get higher weight.

### Why Logistic Regression?
It's fast, interpretable, works well with high-dimensional sparse data (like TF-IDF), provides probability estimates, and has strong baseline performance for text classification.

### Why compare models?
Different algorithms have different strengths. Comparing ensures we select the best-performing model for the data rather than assuming one algorithm is always superior.

### What is precision?
Of all items the model predicted as positive (fake), what fraction were actually fake? Precision = TP / (TP + FP).

### What is recall?
Of all actual fake items, what fraction did the model correctly identify? Recall = TP / (TP + FN).

### What is F1-score?
The harmonic mean of precision and recall. It balances both metrics and is useful when class distribution is uneven. F1 = 2 * (P * R) / (P + R).

### What is overfitting?
When a model performs well on training data but poorly on unseen data. It means the model memorized noise rather than learning general patterns.

### What is data leakage?
When information from outside the training process (like test data) is used during model building, leading to artificially inflated performance metrics. We prevent this by fitting TF-IDF only on training data.

### How is clickbait detected?
Using interpretable headline features (exclamation marks, capitalization ratio, curiosity words, emotional words, urgency words) combined with a classifier. We provide clear explanations of which features triggered the clickbait label.

### Why can clickbait be different from fake news?
Clickbait is about misleading presentation (sensationalized headlines, click-driven content). Fake news is about fabricated or distorted information. A real article can be clickbait, and a fake article may not use clickbait tactics.

### Why can't the model prove factual truth?
The model learned patterns from training data labels. It predicts likelihood based on textual patterns — it doesn't verify facts against external evidence. It's a prediction tool, not a truth engine.

### What are the limitations?
- ML predictions, not verified facts
- Dependent on training data quality
- May not generalize to all news domains
- Clickbait detection uses heuristics when labeled data unavailable

### What future improvements are possible?
- Larger, more diverse datasets
- Deep learning models (BERT)
- Cross-lingual support
- Real-time fact-checking integration
- User feedback loop

## 2-Minute Project Explanation
"AI NewsGuard is a web application that uses NLP and machine learning to analyze news content. Users enter a headline or article, and the system provides: 1) A fake news classification with confidence score, 2) Clickbait detection with feature-based explanations, 3) Sentiment analysis, 4) News category classification. All predictions come with explainable indicators. The system uses TF-IDF with Logistic Regression for fake news detection, and a transparent rule-based approach for clickbait analysis. Results are stored in SQLite for history tracking."

## 5-Minute Presentation Flow
1. **Problem & Motivation** (1 min): Fake news and clickbait are major problems; automated detection is needed
2. **System Overview** (1 min): Show architecture diagram — frontend, backend, ML services
3. **Technical Approach** (1.5 min): TF-IDF, model comparison, classification pipeline
4. **Live Demo** (1 min): Show analysis of a sample headline with all results
5. **Evaluation & Results** (0.5 min): Present key metrics from model evaluation
