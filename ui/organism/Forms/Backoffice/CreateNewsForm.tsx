import {
  CreateNews,
  NewsCategory,
  newsCategoryList,
  getNewsCategoryLabel,
  createNewsFormSchema,
} from "@/domain/News";
import {
  Input,
  Modal,
  Select,
  Button,
  Textarea,
  ModalBody,
  SelectItem,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useCreateNews } from "@/hooks/news/useCreateNews";

export interface CreateNewsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNewsForm: React.FC<CreateNewsFormProps> = ({
  isOpen,
  onClose,
}) => {
  const createNewsMutation = useCreateNews();

  const defaultValues: CreateNews = {
    title: "",
    content: "",
    category: NewsCategory.GENERAL,
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: createNewsFormSchema,
      onBlur: createNewsFormSchema,
      onChange: createNewsFormSchema,
    },
    onSubmit: (values) => {
      createNewsMutation.mutate(values.value);
      form.reset();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">Crear noticia</h2>
        </ModalHeader>

        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={createNewsMutation.isPending}
            onPress={() => {
              form.handleSubmit();
            }}
            isDisabled={
              createNewsMutation.isPending || form.state.isSubmitting
            }
          >
            Crear noticia
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewsForm;

