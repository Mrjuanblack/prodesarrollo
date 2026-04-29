"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  addToast,
} from "@heroui/react";
import { Eye, Info } from "lucide-react";
import { HomeCarouselSlide, SlideCards } from "@/domain/HomeCarouselSlide";
import { FileUploadButtonComponent } from "@/ui/atoms/FileUploadButton/file-upload-button.component";
import { buildStorageUrl } from "@/lib/storage-url";

interface SlideFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialSlide?: HomeCarouselSlide;
  isPending: boolean;
  onClose: () => void;
  onSubmit: (input: { file?: File; cards: SlideCards }) => Promise<void>;
}

const emptyState = {
  leftEnabled: false,
  leftTitle: "",
  leftDescription: "",
  rightEnabled: false,
  rightTitle: "",
  rightDescription: "",
};

const SlideFormModal: React.FC<SlideFormModalProps> = ({
  isOpen,
  mode,
  initialSlide,
  isPending,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState(emptyState);

  useEffect(() => {
    if (!isOpen) return;
    setFile(null);
    if (initialSlide) {
      setState({
        leftEnabled: initialSlide.leftCard !== null,
        leftTitle: initialSlide.leftCard?.title ?? "",
        leftDescription: initialSlide.leftCard?.description ?? "",
        rightEnabled: initialSlide.rightCard !== null,
        rightTitle: initialSlide.rightCard?.title ?? "",
        rightDescription: initialSlide.rightCard?.description ?? "",
      });
    } else {
      setState(emptyState);
    }
  }, [isOpen, initialSlide]);

  // Live preview source: prefer the freshly-picked file (object URL), then
  // fall back to the existing R2 image when editing.
  const previewImageUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (initialSlide?.imageUrl) return buildStorageUrl(initialSlide.imageUrl);
    return null;
  }, [file, initialSlide?.imageUrl]);

  useEffect(() => {
    // Object URLs hold a Blob in memory until revoked.
    if (file && previewImageUrl?.startsWith("blob:")) {
      return () => URL.revokeObjectURL(previewImageUrl);
    }
  }, [file, previewImageUrl]);

  const previewLeftCard =
    state.leftEnabled && (state.leftTitle.trim() || state.leftDescription.trim())
      ? { title: state.leftTitle, description: state.leftDescription }
      : null;
  const previewRightCard =
    state.rightEnabled &&
    (state.rightTitle.trim() || state.rightDescription.trim())
      ? { title: state.rightTitle, description: state.rightDescription }
      : null;

  const handleSubmit = async () => {
    // Image required when creating; optional when editing.
    if (mode === "create" && !file) {
      addToast({
        color: "danger",
        title: "Falta la imagen",
        description: "Selecciona una imagen de fondo para el slide.",
      });
      return;
    }

    if (!state.leftEnabled && !state.rightEnabled) {
      addToast({
        color: "danger",
        title: "Falta contenido",
        description: "Activa al menos una de las dos cartas.",
      });
      return;
    }

    const leftCard = state.leftEnabled
      ? { title: state.leftTitle.trim(), description: state.leftDescription.trim() }
      : null;
    const rightCard = state.rightEnabled
      ? { title: state.rightTitle.trim(), description: state.rightDescription.trim() }
      : null;

    if (leftCard && (!leftCard.title || !leftCard.description)) {
      addToast({
        color: "danger",
        title: "Carta izquierda incompleta",
        description: "Completa título y descripción o desactiva la carta.",
      });
      return;
    }
    if (rightCard && (!rightCard.title || !rightCard.description)) {
      addToast({
        color: "danger",
        title: "Carta derecha incompleta",
        description: "Completa título y descripción o desactiva la carta.",
      });
      return;
    }

    try {
      await onSubmit({
        file: file ?? undefined,
        cards: { leftCard, rightCard },
      });
      onClose();
    } catch (error) {
      console.error(error);
      addToast({
        color: "danger",
        title: "No pudimos guardar el slide",
        description: "Revisa los campos e intenta nuevamente.",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">
            {mode === "create" ? "Crear slide" : "Editar slide"}
          </h2>
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-default-700">
                Imagen de fondo {mode === "edit" && "(opcional, reemplaza la actual)"}
              </label>

              <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
                    Recomendaciones para la imagen
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-blue-900/90">
                    <li>
                      <strong>Buena resolución</strong>: usa imágenes grandes
                      (mínimo 1920×1080 px) para que no se vean borrosas en
                      pantallas grandes.
                    </li>
                    <li>
                      <strong>Apaisada (más ancha que alta)</strong>: el slide
                      es horizontal. Una proporción 16:9 (ej. 1920×1080) o
                      similar funciona mejor que una imagen vertical.
                    </li>
                    <li>
                      <strong>Tonos oscuros</strong>: las cartas con texto se
                      pintan blancas encima de la imagen. Si la foto es muy
                      clara, el texto se pierde. Prefiere fotos con sombras o
                      contraste oscuro.
                    </li>
                  </ul>
                </div>
              </div>

              <FileUploadButtonComponent
                label="Seleccionar imagen"
                value={file}
                onChange={setFile}
                multiple={false}
              />
            </div>

            <CardSection
              title="Carta izquierda"
              enabled={state.leftEnabled}
              onToggle={(v) => setState((s) => ({ ...s, leftEnabled: v }))}
              titleValue={state.leftTitle}
              onTitleChange={(v) => setState((s) => ({ ...s, leftTitle: v }))}
              descriptionValue={state.leftDescription}
              onDescriptionChange={(v) =>
                setState((s) => ({ ...s, leftDescription: v }))
              }
            />

            <CardSection
              title="Carta derecha"
              enabled={state.rightEnabled}
              onToggle={(v) => setState((s) => ({ ...s, rightEnabled: v }))}
              titleValue={state.rightTitle}
              onTitleChange={(v) => setState((s) => ({ ...s, rightTitle: v }))}
              descriptionValue={state.rightDescription}
              onDescriptionChange={(v) =>
                setState((s) => ({ ...s, rightDescription: v }))
              }
            />

            <SlidePreview
              imageUrl={previewImageUrl}
              leftCard={previewLeftCard}
              rightCard={previewRightCard}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            isLoading={isPending}
            isDisabled={isPending}
            onPress={handleSubmit}
          >
            {mode === "create" ? "Crear" : "Guardar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface CardSectionProps {
  title: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  titleValue: string;
  onTitleChange: (value: string) => void;
  descriptionValue: string;
  onDescriptionChange: (value: string) => void;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  enabled,
  onToggle,
  titleValue,
  onTitleChange,
  descriptionValue,
  onDescriptionChange,
}) => (
  <div className="border border-default-200 rounded-xl p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-default-800">{title}</h3>
      <Switch isSelected={enabled} onValueChange={onToggle}>
        {enabled ? "Activa" : "Desactivada"}
      </Switch>
    </div>
    {enabled && (
      <div className="flex flex-col gap-3">
        <Input
          label="Título"
          placeholder="Ingresa el título"
          value={titleValue}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <Textarea
          label="Descripción"
          placeholder="Ingresa la descripción"
          minRows={3}
          value={descriptionValue}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    )}
  </div>
);

interface SlidePreviewProps {
  imageUrl: string | null;
  leftCard: { title: string; description: string } | null;
  rightCard: { title: string; description: string } | null;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  imageUrl,
  leftCard,
  rightCard,
}) => {
  const cards: { key: "left" | "right"; title: string; description: string }[] =
    [];
  if (leftCard) cards.push({ key: "left", ...leftCard });
  if (rightCard) cards.push({ key: "right", ...rightCard });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-default-700">
        <Eye className="w-4 h-4" />
        Vista previa
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-default-100 border border-default-200">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Preview del slide"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-default-500 text-sm">
            Sube una imagen para ver el preview
          </div>
        )}

        {cards.length > 0 && (
          <div className="absolute inset-0 flex flex-col justify-end p-3 lg:p-5">
            <div
              className={`grid gap-2 lg:gap-4 ${
                cards.length === 2 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {cards.map((card) => (
                <div
                  key={card.key}
                  className="bg-primary/70 rounded-lg p-2 lg:p-4 backdrop-blur-sm"
                >
                  <p className="text-white font-bold text-[10px] lg:text-[14px] line-clamp-1">
                    {card.title || "(sin título)"}
                  </p>
                  <p className="text-white text-[9px] lg:text-[12px] line-clamp-3 leading-snug">
                    {card.description || "(sin descripción)"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-default-500">
        Esta es una vista aproximada. En la home el slide se ve más grande y
        ocupa todo el ancho.
      </p>
    </div>
  );
};

export default SlideFormModal;
