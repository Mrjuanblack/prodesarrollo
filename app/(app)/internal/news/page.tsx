"use client";

import { getNewsCategoryLabel } from "@/domain/News";
import { useNewsList } from "@/hooks/news/useNewsList";
import { Button, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { PencilIcon } from "lucide-react";
import { Section, Container } from "@/ui/molecules";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateNewsForm from "@/ui/organism/Forms/Backoffice/CreateNewsForm";

export default function NewsPage() {
    const router = useRouter();

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
    });

    const { data: news, isLoading } = useNewsList(pagination);

    const totalPages = (() => {
        if (news) {
            return Math.ceil(news.total / news.size);
        }
        return 0;
    })();

    return (<div>
        <Section>
            <Container>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Noticias</h1>
                    <Button color="primary" onPress={() => setIsCreateOpen(true)}>
                        Agregar noticia
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
                        <TableColumn key="title">Título</TableColumn>
                        <TableColumn key="category">Categoría</TableColumn>
                        <TableColumn key="createdAt">Fecha de creación</TableColumn>
                        <TableColumn key="updatedAt">Fecha de actualización</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={news?.data ?? []}
                        loadingContent={<Spinner />}
                        loadingState={isLoading ? "loading" : "idle"}
                    >
                        {(item) => (
                            <TableRow
                                key={item.id}
                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{getNewsCategoryLabel(item.category)}</TableCell>
                                <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>{item.updatedAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        color="primary"
                                        isIconOnly
                                        onPress={() =>
                                            router.push(`/internal/news/${item.id}`)
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

        <CreateNewsForm
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
        />

    </div>);

}