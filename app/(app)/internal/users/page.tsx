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
import { useUsers } from "@/hooks/users/useUsers";
import CreateUserForm from "@/ui/organism/Forms/Backoffice/CreateUserForm";

const UserList = () => {
  const router = useRouter();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  const { data: users, isLoading } = useUsers(pagination);

  const totalPages = (() => {
    if (users) {
      return Math.ceil(users.total / users.size);
    }
    return 0;
  })();

  return (
    <div>
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <Button color="primary" onPress={() => setIsCreateOpen(true)}>
              Agregar usuario
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
              <TableColumn key="name">Nombre</TableColumn>
              <TableColumn key="date">Email</TableColumn>
              <TableColumn key="createdAt">Fecha de creación</TableColumn>
              <TableColumn key="updatedAt">Fecha de actualización</TableColumn>
              <TableColumn key="actions">Acciones</TableColumn>
            </TableHeader>

            <TableBody
              items={users?.data ?? []}
              loadingContent={<Spinner />}
              loadingState={isLoading ? "loading" : "idle"}
            >
              {(item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{item.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      isIconOnly
                      color="primary"
                      onPress={() => router.push(`/internal/users/${item.id}`)}
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

      <CreateUserForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};

export default UserList;
