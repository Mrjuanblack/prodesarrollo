"use client";

import { useState } from "react";
import {
  Button,
  Spinner,
  Card,
  CardBody,
  addToast,
} from "@heroui/react";
import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { Container, Section } from "@/ui/molecules";
import { useHomeCarousel } from "@/hooks/homeCarousel/useHomeCarousel";
import { useCreateSlide } from "@/hooks/homeCarousel/useCreateSlide";
import { useUpdateSlide } from "@/hooks/homeCarousel/useUpdateSlide";
import { useDeleteSlide } from "@/hooks/homeCarousel/useDeleteSlide";
import { useReorderSlides } from "@/hooks/homeCarousel/useReorderSlides";
import { HomeCarouselSlide } from "@/domain/HomeCarouselSlide";
import { buildStorageUrl } from "@/lib/storage-url";
import SlideFormModal from "./components/SlideFormModal";
import DeleteSlideModal from "./components/DeleteSlideModal";

export default function HomeCarouselPage() {
  const { data: slides, isLoading } = useHomeCarousel();
  const createMutation = useCreateSlide();
  const updateMutation = useUpdateSlide();
  const deleteMutation = useDeleteSlide();
  const reorderMutation = useReorderSlides();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HomeCarouselSlide | null>(
    null
  );
  const [deletingSlide, setDeletingSlide] = useState<HomeCarouselSlide | null>(
    null
  );

  const moveSlide = async (index: number, direction: -1 | 1) => {
    if (!slides) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const reordered = [...slides];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    await reorderMutation.mutateAsync({
      orders: reordered.map((slide, idx) => ({
        id: slide.id,
        displayOrder: idx,
      })),
    });
  };

  return (
    <div>
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Carrusel del home</h1>
              <p className="text-default-500 text-sm">
                Administra los slides que aparecen en la portada.
              </p>
            </div>
            <Button
              color="primary"
              startContent={<PlusIcon className="w-5 h-5" />}
              onPress={() => setIsCreateOpen(true)}
            >
              Crear slide
            </Button>
          </div>

          {isLoading && (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          )}

          {!isLoading && slides && slides.length === 0 && (
            <Card className="border-dashed border border-default-300">
              <CardBody className="flex flex-col items-center justify-center py-16 gap-3 text-default-500">
                <ImageIcon className="w-10 h-10" />
                <p>No hay slides. Crea el primero para comenzar.</p>
              </CardBody>
            </Card>
          )}

          <div className="flex flex-col gap-4">
            {slides?.map((slide, idx) => (
              <Card key={slide.id} className="border border-default-200">
                <CardBody className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-64 h-40 relative rounded-lg overflow-hidden bg-default-100 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={buildStorageUrl(slide.imageUrl)}
                      alt={`Slide ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wider text-default-500">
                      Slide #{idx + 1}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <CardPreview
                        label="Carta izquierda"
                        card={slide.leftCard}
                      />
                      <CardPreview
                        label="Carta derecha"
                        card={slide.rightCard}
                      />
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 md:items-end">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      isDisabled={idx === 0 || reorderMutation.isPending}
                      onPress={() => moveSlide(idx, -1)}
                      aria-label="Subir"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      isDisabled={
                        idx === slides.length - 1 || reorderMutation.isPending
                      }
                      onPress={() => moveSlide(idx, 1)}
                      aria-label="Bajar"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      onPress={() => setEditingSlide(slide)}
                      aria-label="Editar"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      onPress={() => setDeletingSlide(slide)}
                      aria-label="Eliminar"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <SlideFormModal
        isOpen={isCreateOpen}
        mode="create"
        isPending={createMutation.isPending}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={async ({ file, cards }) => {
          if (!file) throw new Error("File is required for create");
          await createMutation.mutateAsync({ file, cards });
          addToast({
            color: "success",
            title: "Slide creado",
            description: "El nuevo slide aparece al final del carrusel.",
          });
        }}
      />

      <SlideFormModal
        isOpen={editingSlide !== null}
        mode="edit"
        initialSlide={editingSlide ?? undefined}
        isPending={updateMutation.isPending}
        onClose={() => setEditingSlide(null)}
        onSubmit={async ({ file, cards }) => {
          if (!editingSlide) return;
          await updateMutation.mutateAsync({
            id: editingSlide.id,
            file,
            cards,
          });
          addToast({
            color: "success",
            title: "Slide actualizado",
          });
        }}
      />

      <DeleteSlideModal
        isOpen={deletingSlide !== null}
        isPending={deleteMutation.isPending}
        onClose={() => setDeletingSlide(null)}
        onConfirm={async () => {
          if (!deletingSlide) return;
          await deleteMutation.mutateAsync(deletingSlide.id);
          addToast({
            color: "success",
            title: "Slide eliminado",
          });
          setDeletingSlide(null);
        }}
      />
    </div>
  );
}

const CardPreview: React.FC<{
  label: string;
  card: { title: string; description: string } | null;
}> = ({ label, card }) => (
  <div className="border border-default-200 rounded-lg p-3">
    <p className="text-[11px] uppercase tracking-wider text-default-400">
      {label}
    </p>
    {card ? (
      <>
        <p className="font-semibold text-default-800 mt-1">{card.title}</p>
        <p className="text-sm text-default-600 line-clamp-2">
          {card.description}
        </p>
      </>
    ) : (
      <p className="text-sm text-default-400 italic mt-1">Sin contenido</p>
    )}
  </div>
);
