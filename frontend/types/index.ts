export interface AnalysisResult {
  id: number;
  title: string;
  text?: string;
  category?: string;
  created_at: string;
  fake_news: {
    label: string;
    probability: number;
    confidence: number;
  };
  clickbait: {
    label: string;
    probability: number;
    confidence: number;
    features?: Record<string, number>;
  };
  sentiment: {
    sentiment: string;
    score: number;
  };
  category_prediction: {
    category: string;
    confidence: number;
  };
  summary: string;
  explanation: string;
}

export interface HistoryRecord {
  id: number;
  created_at: string;
  title: string;
  article_preview: string | null;
  fake_probability: number;
  predicted_label: string;
  clickbait_probability: number;
  clickbait_label: string;
  sentiment: string;
  category: string;
  analysis_summary: string | null;
}
