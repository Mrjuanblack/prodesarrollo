import { ProjectStatus, ProjectType } from "@/domain/Projects";
import { pgEnum, pgTable, primaryKey, text, timestamp, uuid, check } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const projectStatusEnum = pgEnum('project_status', ProjectStatus);
export const projectTypeEnum = pgEnum('project_type', ProjectType);

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    type: projectTypeEnum('type').notNull(),
    status: projectStatusEnum('status').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const projectsToProjects = pgTable('projects_to_projects', {
    projectOneId: uuid('project_one_id').references(() => projects.id).notNull(),
    projectTwoId: uuid('project_two_id').references(() => projects.id).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
}, (table) => [
    primaryKey({ columns: [table.projectOneId, table.projectTwoId] }),
    check('different_projects', sql`${table.projectOneId} != ${table.projectTwoId}`)
]);

export const projectPhotos = pgTable('project_photos', {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const projectDocuments = pgTable('project_documents', {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id).notNull(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const projectRelations = relations(projects, ({ many }) => ({
    photos: many(projectPhotos),
    documents: many(projectDocuments),
    relatedProjectsAsOne: many(projectsToProjects, { relationName: "projectOne" }),
    relatedProjectsAsTwo: many(projectsToProjects, { relationName: "projectTwo" })
}));

export const projectPhotosRelations = relations(projectPhotos, ({ one }) => ({
    project: one(projects, {
        fields: [projectPhotos.projectId],
        references: [projects.id]
    })
}));

export const projectDocumentsRelations = relations(projectDocuments, ({ one }) => ({
    project: one(projects, {
        fields: [projectDocuments.projectId],
        references: [projects.id]
    })
}));

export const projectsToProjectsRelations = relations(projectsToProjects, ({ one }) => ({
    projectOne: one(projects, {
        fields: [projectsToProjects.projectOneId],
        references: [projects.id],
        relationName: "projectOne"
    }),
    projectTwo: one(projects, {
        fields: [projectsToProjects.projectTwoId],
        references: [projects.id],
        relationName: "projectTwo"
    })
}));