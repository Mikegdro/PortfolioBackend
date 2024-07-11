ALTER TABLE "api"."achievement" DROP CONSTRAINT "achievement_id_project_id_fk";
--> statement-breakpoint
ALTER TABLE "api"."achievement" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "api"."achievement" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "api"."achievement" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api"."achievement" ADD COLUMN "project_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api"."achievement" ADD CONSTRAINT "achievement_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "api"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
