CREATE TABLE proverbs (
  contentId UUID PRIMARY KEY REFERENCES content(id) ON DELETE CASCADE,
  proverbCategory TEXT,
  difficulty TEXT,
  content TEXT,
  englishTranslation TEXT
);
