"use client";

import {
  Table,
  Button,
  Spinner,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  TableColumn,
  TableHeader,
} from "@heroui/react";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Container, Section } from "@/ui/molecules";
import { useProjects } from "@/hooks/project/useProjects";
import ProjectStatusChip from "@/ui/atoms/Chips/project-status-chip";
import ProjectTypeChip from "@/ui/atoms/Chips/project-type-chip";
import CreateProjectForm from "@/ui/organism/Forms/Backoffice/CreateProjectForm";
import ProjectHighlightChip from "@/ui/atoms/Chips/project-highlight-chip";
import ProjectDonationChip from "@/ui/atoms/Chips/project-donation-chip";

export default function ProjectsPage() {
  const router = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  const { data: projects, isLoading } = useProjects(pagination);

  const totalPages = (() => {
    if (projects) {
      return Math.ceil(projects.total / projects.size);
    }
    return 0;
  })();

  return (
    <div>
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Proyectos</h1>
            <Button color="primary" onPress={() => setIsCreateOpen(true)}>
              Agregar proyecto
            </Button>
          </div>
          <Table
            bottomContent={
              totalPages > 0 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={pagination.page + 1}
                    total={totalPages}
                    onChange={(newPage) =>
                      setPagination({ ...pagination, page: newPage - 1 })
                    }
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn key="code">Código</TableColumn>
              <TableColumn key="date">Fecha</TableColumn>
              <TableColumn key="status">Estado</TableColumn>
              <TableColumn key="type">Tipo</TableColumn>
              <TableColumn key="createdAt">Fecha de creación</TableColumn>
              <TableColumn key="updatedAt">Fecha de actualización</TableColumn>
              <TableColumn key="actions">Acciones</TableColumn>
            </TableHeader>
            <TableBody
              items={projects?.data ?? []}
              loadingContent={<Spinner />}
              loadingState={isLoading ? "loading" : "idle"}
            >
              {(item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="flex gap-2">
                    <span>{item.code}</span>
                    {item.highlight && <ProjectHighlightChip />}
                    {item.donationProject && <ProjectDonationChip />}
                  </TableCell>

                  <TableCell>{item.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <ProjectStatusChip status={item.status} />
                  </TableCell>
                  <TableCell>
                    <ProjectTypeChip type={item.type} />
                  </TableCell>
                  <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{item.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      color="primary"
                      isIconOnly
                      onPress={() =>
                        router.push(`/internal/projects/${item.id}`)
                      }
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Container>
      </Section>

      <CreateProjectForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
