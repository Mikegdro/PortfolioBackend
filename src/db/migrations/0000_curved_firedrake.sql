CREATE SCHEMA "api";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "api"."project_type" AS ENUM('private', 'personal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "api"."rol" AS ENUM('Frontend', 'Backend', 'Fullstack');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."achievement" (
	"id" uuid,
	"title" varchar NOT NULL,
	"description" varchar,
	"rol" "api"."rol"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"linkedn" varchar,
	"description" varchar,
	"logo" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."course" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"instructor" varchar,
	"link" varchar,
	"linkedin" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"web" varchar,
	"linkedin" varchar,
	"score" numeric,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."personal_project" (
	"personal_project_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"title" varchar(256) NOT NULL,
	"repository" varchar,
	"image" varchar,
	"image_reduce" varchar,
	CONSTRAINT "personal_project_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."private_project" (
	"private_project_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid,
	"title" varchar(256) NOT NULL,
	"company_id" uuid,
	"start_date" date,
	"end_date" date,
	CONSTRAINT "private_project_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(256),
	"type" "api"."project_type"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now(),
	"password" varchar,
	"isAdmin" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."achievement" ADD CONSTRAINT "achievement_id_project_id_fk" FOREIGN KEY ("id") REFERENCES "api"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."personal_project" ADD CONSTRAINT "personal_project_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "api"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."private_project" ADD CONSTRAINT "private_project_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "api"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."private_project" ADD CONSTRAINT "private_project_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "api"."company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ach_title_index" ON "api"."achievement" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rol_index" ON "api"."achievement" USING btree ("rol");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_name_idx" ON "api"."company" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_title_index" ON "api"."course" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "edu_title_index" ON "api"."education" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "personal_title_idx" ON "api"."personal_project" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "private_title_idx" ON "api"."private_project" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "project_name_idx" ON "api"."project" USING btree ("description");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "api"."user" USING btree ("user_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "api"."user" USING btree ("email");