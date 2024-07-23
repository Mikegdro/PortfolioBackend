CREATE TABLE IF NOT EXISTS "api"."tecnology" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"site" varchar,
	"twitter" varchar,
	"logo" varchar
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tecnology_name_idx" ON "api"."tecnology" USING btree ("name");