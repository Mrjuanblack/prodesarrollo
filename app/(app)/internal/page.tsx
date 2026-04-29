"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Button,
} from "@heroui/react";
import {
  DocumentDuplicateIcon,
  NewspaperIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProjects } from "@/hooks/project/useProjects";
import { useNewsList } from "@/hooks/news/useNewsList";
import { useUsers } from "@/hooks/users/useUsers";
import { getProjectStatusLabel } from "@/domain/Projects";
import { getNewsCategoryLabel } from "@/domain/News";
import {
  canManageNews,
  canManageProjects,
  canManageUsers,
  UserRole,
} from "@/domain/user";

interface StatCardProps {
  label: string;
  value: number | null;
  icon: React.ElementType;
  href: string;
}

function StatCard({ label, value, icon: Icon, href }: StatCardProps) {
  const router = useRouter();
  return (
    <Card
      isPressable
      onPress={() => router.push(href)}
      className="border border-default-200"
    >
      <CardBody className="flex flex-row items-center gap-4 p-6">
        <div className="bg-primary-100 text-primary rounded-xl p-3">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-default-500 text-sm">{label}</p>
          <p className="text-3xl font-bold text-default-900">
            {value ?? "—"}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default function InternalDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const role = user?.role as UserRole | undefined;
  const showProjects = role ? canManageProjects(role) : false;
  const showNews = role ? canManageNews(role) : false;
  const showUsers = role ? canManageUsers(role) : false;

  // Don't fire queries the user isn't allowed to make. The API would just
  // 403 anyway, but skipping avoids the noisy red errors in devtools.
  const projectsQuery = useProjects({ page: 0, size: 5 });
  const newsQuery = useNewsList({ page: 0, size: 5 });
  const usersQuery = useUsers({ page: 0, size: 1 });

  const greeting = user?.username
    ? `Hola, ${user.username}`
    : "Panel de administración";

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-default-900">{greeting}</h1>
        <p className="text-default-500 mt-1">
          Resumen general del contenido publicado en la plataforma.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showProjects && (
          <StatCard
            label="Proyectos"
            value={projectsQuery.data?.total ?? null}
            icon={DocumentDuplicateIcon}
            href="/internal/projects"
          />
        )}
        {showNews && (
          <StatCard
            label="Noticias"
            value={newsQuery.data?.total ?? null}
            icon={NewspaperIcon}
            href="/internal/news"
          />
        )}
        {showUsers && (
          <StatCard
            label="Usuarios"
            value={usersQuery.data?.total ?? null}
            icon={UsersIcon}
            href="/internal/users"
          />
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {showProjects && (
          <Card className="border border-default-200">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Proyectos recientes</h2>
              <Button
                size="sm"
                variant="light"
                color="primary"
                endContent={<ArrowRightIcon className="h-4 w-4" />}
                onPress={() => router.push("/internal/projects")}
              >
                Ver todos
              </Button>
            </CardHeader>
            <CardBody>
              {projectsQuery.isLoading ? (
                <div className="flex justify-center py-6">
                  <Spinner />
                </div>
              ) : !projectsQuery.data?.data.length ? (
                <p className="text-default-500 text-sm py-4">
                  Aún no hay proyectos.
                </p>
              ) : (
                <ul className="divide-y divide-default-200">
                  {projectsQuery.data.data.map((project) => (
                    <li
                      key={project.id}
                      className="py-3 flex items-start justify-between gap-4 cursor-pointer hover:bg-default-50 -mx-3 px-3 rounded"
                      onClick={() =>
                        router.push(`/internal/projects/${project.id}`)
                      }
                    >
                      <div className="min-w-0">
                        <p className="font-medium truncate">{project.title}</p>
                        <p className="text-xs text-default-500 mt-0.5">
                          {project.code} ·{" "}
                          {getProjectStatusLabel(project.status)}
                        </p>
                      </div>
                      <span className="text-xs text-default-400 whitespace-nowrap shrink-0">
                        {project.createdAt.toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        )}

        {showNews && (
          <Card className="border border-default-200">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Noticias recientes</h2>
              <Button
                size="sm"
                variant="light"
                color="primary"
                endContent={<ArrowRightIcon className="h-4 w-4" />}
                onPress={() => router.push("/internal/news")}
              >
                Ver todas
              </Button>
            </CardHeader>
            <CardBody>
              {newsQuery.isLoading ? (
                <div className="flex justify-center py-6">
                  <Spinner />
                </div>
              ) : !newsQuery.data?.data.length ? (
                <p className="text-default-500 text-sm py-4">
                  Aún no hay noticias.
                </p>
              ) : (
                <ul className="divide-y divide-default-200">
                  {newsQuery.data.data.map((news) => (
                    <li
                      key={news.id}
                      className="py-3 flex items-start justify-between gap-4 cursor-pointer hover:bg-default-50 -mx-3 px-3 rounded"
                      onClick={() => router.push(`/internal/news/${news.id}`)}
                    >
                      <div className="min-w-0">
                        <p className="font-medium truncate">{news.title}</p>
                        <p className="text-xs text-default-500 mt-0.5">
                          {getNewsCategoryLabel(news.category)}
                        </p>
                      </div>
                      <span className="text-xs text-default-400 whitespace-nowrap shrink-0">
                        {news.createdAt.toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        )}
      </section>
    </div>
  );
}
