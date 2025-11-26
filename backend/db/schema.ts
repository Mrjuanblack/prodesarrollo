import {
  text,
  uuid,
  check,
  pgEnum,
  pgTable,
  timestamp,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { ProjectStatus, ProjectType } from "@/domain/Projects";
import { NewsCategory } from "@/domain/News";

export const projectStatusEnum = pgEnum("project_status", ProjectStatus);
export const projectTypeEnum = pgEnum("project_type", ProjectType);
export const newsCategoryEnum = pgEnum("news_category", NewsCategory);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: projectTypeEnum("type").notNull(),
  status: projectStatusEnum("status").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
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
      .references(() => projects.id)
      .notNull(),
    projectTwoId: uuid("project_two_id")
      .references(() => projects.id)
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
    .references(() => projects.id)
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const projectDocuments = pgTable("project_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id)
    .notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

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
    .references(() => news.id)
    .notNull(),
  url: text("url").notNull(),
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
}));

export const newsPhotosRelations = relations(newsPhotos, ({ one }) => ({
  news: one(news, {
    fields: [newsPhotos.newsId],
    references: [news.id],
  }),
}));

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
