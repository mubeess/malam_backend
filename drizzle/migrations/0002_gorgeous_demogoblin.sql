CREATE TABLE "appUpdate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"force_update" boolean DEFAULT false,
	"version" varchar(6) DEFAULT '1.0',
	"title" varchar,
	"description" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
