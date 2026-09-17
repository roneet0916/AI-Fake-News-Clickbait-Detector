# Model Evaluation Documentation

## Evaluation Methodology

### Metrics Reported
- **Accuracy**: Overall correct prediction rate
- **Precision**: Of predicted positives, how many are actual positives
- **Recall**: Of actual positives, how many are correctly identified
- **F1-Score**: Harmonic mean of precision and recall
- **Confusion Matrix**: Detailed breakdown of TP, TN, FP, FN
- **ROC-AUC** (if available): Area under Receiver Operating Characteristic curve

### Model Comparison

| Model | Algorithm | Features | Accuracy | Precision | Recall | F1 |
|-------|-----------|----------|----------|-----------|--------|-----|
| Model A | Logistic Regression | TF-IDF | TBD | TBD | TBD | TBD |
| Model B | Multinomial NB | TF-IDF | TBD | TBD | TBD | TBD |

Final model selected based on highest F1-score with tiebreaker on overall accuracy.

### Evaluation Protocol
1. Train models on training set only
2. Evaluate on held-out test set
3. Report mean and std across evaluation (if cross-validation used)
4. Save confusion matrix as artifact
5. Store results in `models/evaluation/` as JSON

### Data Leakage Prevention
- TF-IDF vocabulary fit on training data only
- No test set preprocessing using training statistics
- Stratified split to maintain class distribution
- Random state fixed for reproducibility

### Results Storage
Machine-readable JSON stored at `models/evaluation/results.json`

## To Be Updated
These metrics will be populated after actual model training and evaluation.
