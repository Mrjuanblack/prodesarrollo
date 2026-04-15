"use client";

import {
  NewsCategory,
  UpdateNews,
  newsCategoryList,
  getNewsCategoryLabel,
  updateNewsFormSchema,
} from "@/domain/News";
import { GlobalLoader } from "@/ui/atoms";
import { useForm } from "@tanstack/react-form";
import { useNews } from "@/hooks/news/useNews";
import { Container, Section } from "@/ui/molecules";
import { useParams, useRouter } from "next/navigation";
import { useUpdateNews } from "@/hooks/news/useUpdateNews";
import { Input, Button, Select, Textarea, SelectItem } from "@heroui/react";
import ManageNewsPhotos from "@/ui/organism/Forms/Backoffice/ManageNewsPhotos";

export default function NewsPage() {
  const { id } = useParams();
  const { data: news } = useNews(id as string);
  const router = useRouter();

  const updateNewsMutation = useUpdateNews(id as string);

  const defaultValues: UpdateNews = {
    title: news?.title ?? "",
    content: news?.content ?? "",
    category: news?.category ?? NewsCategory.GENERAL,
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: updateNewsFormSchema,
      onBlur: updateNewsFormSchema,
      onChange: updateNewsFormSchema,
    },
    onSubmit: (values) => {
      updateNewsMutation.mutate(values.value);
    },
  });

  if (!news) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <Section>
        <Container>
          <h1 className="text-2xl font-bold">{news.title}</h1>
          <h2 className="text-sm text-gray-500 mb-4">{news.id}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <form.Field name="title">
                  {(field) => (
                    <Input
                      label="Título"
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Ingresa el título de la noticia"
                      value={field.state.value ?? ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      onBlur={field.handleBlur}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>
              </div>
              <div className="col-span-2">
                <form.Field name="content">
                  {(field) => (
                    <Textarea
                      label="Contenido"
                      id="content"
                      name="content"
                      type="text"
                      placeholder="Ingresa el contenido de la noticia"
                      value={field.state.value ?? ""}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      onBlur={field.handleBlur}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                      minRows={4}
                    />
                  )}
                </form.Field>
              </div>
              <div className="col-span-2">
                <form.Field name="category">
                  {(field) => (
                    <Select
                      label="Categoría"
                      id="category"
                      name="category"
                      selectedKeys={[field.state.value ?? ""]}
                      onSelectionChange={(e) => {
                        field.handleChange(e.currentKey as NewsCategory);
                      }}
                      onBlur={field.handleBlur}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                      defaultSelectedKeys={[field.state.value ?? ""]}
                      disallowEmptySelection
                    >
                      {newsCategoryList.map((category) => (
                        <SelectItem key={category}>
                          {getNewsCategoryLabel(category)}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </form.Field>
              </div>
              <div className="col-span-2 space-x-2">
                <Button
                  type="submit"
                  color="default"
                  onPress={() => router.back()}
                  isLoading={updateNewsMutation.isPending}
                  isDisabled={
                    updateNewsMutation.isPending || form.state.isSubmitting
                  }
                >
                  Volver
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  isLoading={updateNewsMutation.isPending}
                  isDisabled={
                    updateNewsMutation.isPending || form.state.isSubmitting
                  }
                >
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </Section>
      <ManageNewsPhotos news={news} />
    </div>
  );
}
