import { Project, ProjectStatus } from "@/domain/Projects";
import noticiaExample from "@/public/noticia-example.svg";

export const projects: Project[] = [
  {
    title: "Example",
    description: "Example",
    photosUrls: [noticiaExample, noticiaExample],
    documents: [
      {
        id: "1",
        name: "Example",
        url: "Example",
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
    id: "1",
    date: new Date(),
    updatedAt: new Date(),
    relatedProjects: [
      {
        id: "1",
        title: "Example",
      },
    ],
    status: ProjectStatus.STARTED,
  },
  {
    title: "Example dos",
    description: "Example dos",
    photosUrls: [noticiaExample, noticiaExample],
    documents: [
      {
        id: "1",
        name: "Example Dos",
        url: "Example Dos",
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
    id: "2",
    date: new Date(),
    updatedAt: new Date(),
    relatedProjects: [
      {
        id: "1",
        title: "Example Dos",
      },
    ],
    status: ProjectStatus.IN_PROGRESS,
  },
];
