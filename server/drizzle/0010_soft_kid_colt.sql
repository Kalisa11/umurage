CREATE TABLE stories (
  contentId UUID PRIMARY KEY REFERENCES content(id) ON DELETE CASCADE,
  coverImage VARCHAR(255),
  readTime INTEGER,
  content TEXT,
  moralLesson TEXT,
  context TEXT,
  difficulty VARCHAR(255)
);
