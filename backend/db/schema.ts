import {
  text,
  uuid,
  check,
  bigint,
  pgEnum,
  pgTable,
  boolean,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { NewsCategory } from "@/domain/News";
import { IdTypeOptions } from "@/domain/shared";
import { ProjectStatus, ProjectType } from "@/domain/Projects";
import { DonationTypeOptions, PersonTypeOptions } from "@/domain/donation";
import { UserRole } from "@/domain/user";

export const projectStatusEnum = pgEnum("project_status", ProjectStatus);
export const projectTypeEnum = pgEnum("project_type", ProjectType);
export const newsCategoryEnum = pgEnum("news_category", NewsCategory);
export const donationsTypeEnum = pgEnum("donations_type", DonationTypeOptions);
export const personsTypeEnum = pgEnum("persons_type", PersonTypeOptions);
export const idsTypeEnum = pgEnum("ids_type", IdTypeOptions);
export const userRoleEnum = pgEnum("user_role", UserRole);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: projectTypeEnum("type").notNull(),
  status: projectStatusEnum("status").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
  // Stored as raw COP integer (e.g. 1_500_000_000). bigint covers project
  // budgets that exceed INT4_MAX (~2.1B). Mode "number" stays under JS
  // Number.MAX_SAFE_INTEGER (~9.0 × 10^15) for any realistic COP amount.
  cost: bigint("cost", { mode: "number" }).notNull(),
  finalDate: timestamp("final_date", { withTimezone: true }).notNull(),
  clientEntity: text("client_entity").notNull(),
  signatureDate: timestamp("signature_date", { withTimezone: true }).notNull(),
  highlight: boolean("highlight").notNull().default(false),
  donationProject: boolean("donation_project").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const projectsToProjects = pgTable(
  "projects_to_projects",
  {
    projectOneId: uuid("project_one_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    projectTwoId: uuid("project_two_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.projectOneId, table.projectTwoId] }),
    check(
      "different_projects",
      sql`${table.projectOneId} != ${table.projectTwoId}`
    ),
  ]
);

export const projectPhotos = pgTable("project_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const projectDocuments = pgTable("project_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const homeCarouselSlides = pgTable("home_carousel_slides", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  // Each slide may show 1 or 2 cards on top of the background image. At
  // least one card must have content; this constraint is enforced at the
  // application layer (zod) and via a CHECK in the migration.
  leftCardTitle: text("left_card_title"),
  leftCardDescription: text("left_card_description"),
  rightCardTitle: text("right_card_title"),
  rightCardDescription: text("right_card_description"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  check(
    "at_least_one_card",
    sql`(${table.leftCardTitle} IS NOT NULL AND ${table.leftCardDescription} IS NOT NULL)
        OR (${table.rightCardTitle} IS NOT NULL AND ${table.rightCardDescription} IS NOT NULL)`
  ),
]);

export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: newsCategoryEnum("category").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const newsPhotos = pgTable("news_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  newsId: uuid("news_id")
    .references(() => news.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Images embedded inside the rich-text body of a news article. newsId is
// nullable so the row can exist briefly between upload and "save news"
// (when the news row hasn't been created yet); the service then claims
// the row by setting newsId. Cascade delete cleans the rows when the news
// is deleted; the R2 objects themselves are removed by the service.
export const newsInlineImages = pgTable("news_inline_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  newsId: uuid("news_id").references(() => news.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const projectRelations = relations(projects, ({ many }) => ({
  photos: many(projectPhotos),
  documents: many(projectDocuments),
  relatedProjectsAsOne: many(projectsToProjects, {
    relationName: "projectOne",
  }),
  relatedProjectsAsTwo: many(projectsToProjects, {
    relationName: "projectTwo",
  }),
}));

export const projectPhotosRelations = relations(projectPhotos, ({ one }) => ({
  project: one(projects, {
    fields: [projectPhotos.projectId],
    references: [projects.id],
  }),
}));

export const projectDocumentsRelations = relations(
  projectDocuments,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectDocuments.projectId],
      references: [projects.id],
    }),
  })
);

export const projectsToProjectsRelations = relations(
  projectsToProjects,
  ({ one }) => ({
    projectOne: one(projects, {
      fields: [projectsToProjects.projectOneId],
      references: [projects.id],
      relationName: "projectOne",
    }),
    projectTwo: one(projects, {
      fields: [projectsToProjects.projectTwoId],
      references: [projects.id],
      relationName: "projectTwo",
    }),
  })
);

export const newsRelations = relations(news, ({ many }) => ({
  photos: many(newsPhotos),
  inlineImages: many(newsInlineImages),
}));

export const newsPhotosRelations = relations(newsPhotos, ({ one }) => ({
  news: one(news, {
    fields: [newsPhotos.newsId],
    references: [news.id],
  }),
}));

export const newsInlineImagesRelations = relations(
  newsInlineImages,
  ({ one }) => ({
    news: one(news, {
      fields: [newsInlineImages.newsId],
      references: [news.id],
    }),
  })
);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  // Role gates which sections of /internal the user can access. Default of
  // ADMIN keeps existing rows working when this column is added.
  role: userRoleEnum("role").notNull().default(UserRole.ADMIN),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const donations = pgTable("donations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  fullName: text("fullName").notNull(),
  idNumber: text("idNumber").notNull(),
  idType: idsTypeEnum("idType").notNull(),
  anonymousDonation: text("anonymousDonation").notNull(),
  personType: personsTypeEnum("personType").notNull(),
  donatioType: donationsTypeEnum("donatioType").notNull(),
  description: text("description"),
  donateValue: integer("donateValue"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
