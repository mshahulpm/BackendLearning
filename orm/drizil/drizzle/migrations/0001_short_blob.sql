CREATE TABLE IF NOT EXISTS "population" (
	"id" serial PRIMARY KEY NOT NULL,
	"count" integer,
	"city_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "population" ADD CONSTRAINT "population_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
