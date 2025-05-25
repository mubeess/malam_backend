CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255),
	"description" text,
	"cover_image" varchar(255),
	"category" varchar(100),
	"language" varchar(50) DEFAULT 'Arabic',
	"publish_year" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "audio_references" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer,
	"title" varchar(255) NOT NULL,
	"url" varchar(512) NOT NULL,
	"description" text,
	"duration" integer,
	"speaker" varchar(255),
	"language" varchar(50) DEFAULT 'Hausa',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_references" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer,
	"title" varchar(255) NOT NULL,
	"url" varchar(512) NOT NULL,
	"description" text,
	"duration" integer,
	"speaker" varchar(255),
	"language" varchar(50) DEFAULT 'Hausa',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audio_references" ADD CONSTRAINT "audio_references_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_references" ADD CONSTRAINT "video_references_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;