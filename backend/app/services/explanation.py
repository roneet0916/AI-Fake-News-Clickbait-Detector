"""Explanation engine — generates human-readable analysis summaries."""

from typing import Optional


class ExplanationEngine:
    """Generates human-readable explanations for analysis results."""

    def generate(
        self,
        fake_news_result: dict,
        clickbait_result: dict,
        sentiment_result: dict,
        category_result: dict,
        top_features: Optional[list] = None,
    ) -> dict:
        """
        Generate a comprehensive explanation combining all analysis results.
        
        Returns a dict with:
          - summary: one-paragraph human-readable summary
          - indicators: list of detected indicators
          - disclaimer: standard limitation notice
          - feature_explanations: list of feature-level explanations
        """
        indicators = []
        feature_explanations = []

        # --- Fake news indicators ---
        fake_prob = fake_news_result.get("probability", 0.5)
        fake_label = fake_news_result.get("label", "unknown")

        if fake_prob >= 0.7:
            indicators.append({
                "type": "fake_news",
                "severity": "high",
                "message": f"The model assigns a {fake_prob:.0%} probability of potentially misleading content based on learned textual patterns.",
            })
        elif fake_prob >= 0.4:
            indicators.append({
                "type": "fake_news",
                "severity": "medium",
                "message": f"The model assigns a {fake_prob:.0%} probability of potentially misleading content. This is in the uncertain range.",
            })
        else:
            indicators.append({
                "type": "fake_news",
                "severity": "low",
                "message": f"The model assigns a {fake_prob:.0%} probability of potentially misleading content, suggesting the text follows patterns typical of reliable sources.",
            })

        # --- Clickbait indicators ---
        cb_prob = clickbait_result.get("clickbait_probability", 0.0)
        cb_features = clickbait_result.get("features", {})
        cb_method = clickbait_result.get("method", "heuristic")

        if cb_prob >= 0.5:
            indicators.append({
                "type": "clickbait",
                "severity": "high",
                "message": f"Clickbait score: {cb_prob:.0%}. Multiple clickbait characteristics detected ({cb_method} analysis).",
            })
        elif cb_prob >= 0.25:
            indicators.append({
                "type": "clickbait",
                "severity": "medium",
                "message": f"Clickbait score: {cb_prob:.0%}. Some clickbait characteristics present ({cb_method} analysis).",
            })
        else:
            indicators.append({
                "type": "clickbait",
                "severity": "low",
                "message": f"Clickbait score: {cb_prob:.0%}. Few clickbait characteristics detected ({cb_method} analysis).",
            })

        # Add specific clickbait feature explanations
        if cb_features.get("exclamation_count", 0) > 1:
            feature_explanations.append("Multiple exclamation marks detected — common in sensational headlines.")
        if cb_features.get("question_mark_count", 0) > 0:
            feature_explanations.append("Question marks present — often used to create curiosity gaps.")
        if cb_features.get("uppercase_ratio", 0) > 0.3:
            feature_explanations.append("High proportion of uppercase letters — suggests emphasis or shouting.")
        if cb_features.get("emotional_word_count", 0) > 0:
            feature_explanations.append(f"Emotional language detected ({cb_features['emotional_word_count']} emotional words).")
        if cb_features.get("urgency_word_count", 0) > 0:
            feature_explanations.append(f"Urgency language detected ({cb_features['urgency_word_count']} urgency words).")
        if cb_features.get("curiosity_phrase_count", 0) > 0:
            feature_explanations.append(f"Curiosity-gap phrases detected ({cb_features['curiosity_phrase_count']} phrases).")
        if cb_features.get("sensational_keyword_count", 0) > 0:
            feature_explanations.append(f"Sensational keywords detected ({cb_features['sensational_keyword_count']} keywords).")

        # --- Sentiment indicator ---
        sent_label = sentiment_result.get("sentiment", "neutral")
        sent_score = sentiment_result.get("score", 0.0)
        indicators.append({
            "type": "sentiment",
            "severity": "info",
            "message": f"Detected sentiment: {sent_label} (score: {sent_score:+.4f}).",
        })

        # --- Category indicator ---
        cat_label = category_result.get("category", "other")
        cat_conf = category_result.get("confidence", 0.0)
        cat_method = category_result.get("method", "keyword matching")
        indicators.append({
            "type": "category",
            "severity": "info",
            "message": f"Classified category: {cat_label} (confidence: {cat_conf:.0%}, method: {cat_method}).",
        })

        # --- Top ML features ---
        if top_features:
            for feat in top_features[:5]:
                word = feat.get("word", "")
                weight = feat.get("weight", 0.0)
                direction = "fake" if weight > 0 else "real"
                feature_explanations.append(
                    f"The word '{word}' has a model weight of {weight:+.4f}, pushing the prediction toward '{direction}'."
                )

        # --- Build summary ---
        summary = self._build_summary(fake_label, fake_prob, cb_prob, sent_label, cat_label, cb_method)

        return {
            "summary": summary,
            "indicators": indicators,
            "feature_explanations": feature_explanations,
            "disclaimer": (
                "This analysis is generated by machine learning models trained on historical data. "
                "It reflects statistical patterns and does not constitute factual verification. "
                "A clickbait headline is not necessarily false, and a non-clickbait headline is not necessarily true. "
                "Use this tool as a supplementary resource, not as the sole basis for judgment."
            ),
        }

    def _build_summary(
        self,
        fake_label: str,
        fake_prob: float,
        cb_prob: float,
        sentiment: str,
        category: str,
        cb_method: str,
    ) -> str:
        """Build a one-paragraph human-readable summary."""
        parts = []

        # Fake news summary
        if fake_label in ("fake", "potentially_misleading"):
            parts.append(
                f"The fake news model predicts this content as potentially misleading "
                f"with {fake_prob:.0%} probability."
            )
        else:
            parts.append(
                f"The fake news model predicts this content as likely reliable "
                f"with {1 - fake_prob:.0%} confidence."
            )

        # Clickbait summary
        if cb_prob >= 0.5:
            parts.append(f"The {cb_method}-based clickbait analysis indicates strong clickbait characteristics (score: {cb_prob:.0%}).")
        elif cb_prob >= 0.25:
            parts.append(f"The {cb_method}-based clickbait analysis shows moderate clickbait indicators (score: {cb_prob:.0%}).")
        else:
            parts.append(f"The {cb_method}-based clickbait analysis shows low clickbait indicators (score: {cb_prob:.0%}).")

        # Sentiment and category
        parts.append(f"The overall sentiment is {sentiment}.")
        if category != "other":
            parts.append(f"The content is classified under the '{category}' category.")

        return " ".join(parts)
