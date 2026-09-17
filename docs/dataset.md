# Dataset Documentation

## Primary Dataset: LIAR Fake News Dataset

**Source**: https://www.cs.ucsb.edu/~william/data/liar_dataset.zip
**License**: Research dataset (UCSB)
**Papers**: Wang, W., et al. (2017). "Liar, Liar Pants on Fire: A New Benchmark Dataset for Fake News Detection." ACL 2017.

### Structure
- **File**: `LIAR_fake_news_dataset.csv` (or similar format)
- **Fields**: statement, subject, speaker, party, state, district, latitude, longitude, article, label
- **Label**: 0 (fake) / 1 (real) — " pants on fire" rating scale also available

### Secondary Dataset: Clickbait Headlines
**Source**: Various publicly available clickbait detection datasets
**Examples**: 
- Webis Clickbait Corpus (2016)
- Headline-based clickbait datasets from research repositories

### Cleaning Process
1. Remove rows with missing text fields
2. Remove duplicate entries
3. Inspect class distribution
4. Strip HTML artifacts
5. Normalize whitespace
6. Validate label values

### Split Strategy
- 80% train / 20% test (stratified by label)
- random_state=42 for reproducibility
- No leakage: TF-IDF fit on training data only

### Limitations
- Dataset may not cover all news categories equally
- Historical dataset — may not reflect current news patterns
- Binary classification (real/fake) — no fine-grained credibility levels
