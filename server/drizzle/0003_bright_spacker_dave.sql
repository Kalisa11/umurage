-- Custom SQL migration file, put your code below! --

ALTER TABLE "upcoming_activities" ADD COLUMN "is_featured" boolean DEFAULT false;
ALTER TABLE "upcoming_activities" ADD COLUMN "tag" varchar(100);

-- Drop the column "created_by" from the "upcoming_activities" table
ALTER TABLE "upcoming_activities" DROP COLUMN "created_by";

-- rename table "upcoming_activities" to "events"
ALTER TABLE "upcoming_activities" RENAME TO "events";