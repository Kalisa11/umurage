-- Custom SQL migration file, put your code below! --
CREATE TABLE IF NOT EXISTS "music" (
    "contentId" UUID PRIMARY KEY REFERENCES "content"("id") NOT NULL,
    "genre" TEXT,
    "coverImage" TEXT,
    "audioUrl" TEXT,
    "content" TEXT,
    "tags" TEXT[],
    "tempo" TEXT  
);