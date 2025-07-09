create table content (
  "id" uuid primary key default gen_random_uuid () not null,
  "title" TEXT not null,
  "description" TEXT,
  "isFeatured" BOOLEAN default false,
  "region" TEXT,
  "contributorId" UUID references users (id),
  categoryId integer references categories (id),
  createdAt TIMESTAMP default NOW(),
  updatedAt TIMESTAMP default NOW()
);