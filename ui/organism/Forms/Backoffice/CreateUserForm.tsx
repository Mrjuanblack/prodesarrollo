"use client";

import {
  Modal,
  Input,
  Button,
  addToast,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@heroui/react";
import { FC, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { createUserFormSchema, CreateUserFormType } from "@/domain/user";

export interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserForm: FC<CreateUserProps> = ({ isOpen, onClose }) => {
  const registerMutation = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);

  const finalType = showPassword ? "text" : "password";

  const defaultValues: CreateUserFormType = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: createUserFormSchema,
      onSubmit: createUserFormSchema,
      onChange: createUserFormSchema,
    },
    onSubmit: ({ value }) => {
      registerMutation.mutate(value, {
        onError: () => {
          addToast({
            title: "Error al registrarte",
            description: "Por favor verifica tus datos.",
            color: "danger",
          });
        },
        onSuccess: () => {
          onClose();
          form.reset();
          addToast({
            title: "Registro exitoso",
            description: "Tu cuenta ha sido creada correctamente.",
            color: "success",
          });
        },
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">Crear User</h2>
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
              <form.Field name="username">
                {(field) => (
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Tu usuario"
                    label="Nombre de usuario"
                    value={field.state.value ?? ""}
                    errorMessage={field.state.meta.errors[0]?.message}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                  />
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    value={field.state.value ?? ""}
                    errorMessage={field.state.meta.errors[0]?.message}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                  />
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <Input
                    id="password"
                    name="password"
                    label="Contraseña"
                    type={finalType ?? "text"}
                    onBlur={field.handleBlur}
                    value={field.state.value ?? ""}
                    errorMessage={field.state.meta.errors[0]?.message}
                    onChange={(e) => field.handleChange(e.target.value)}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    }
                  />
                )}
              </form.Field>

              <form.Field name="confirmPassword">
                {(field) => (
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    value={field.state.value ?? ""}
                    errorMessage={field.state.meta.errors[0]?.message}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                  />
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
            type="submit"
            color="primary"
            isLoading={registerMutation.isPending}
            onPress={() => {
              form.handleSubmit();
            }}
            isDisabled={registerMutation.isPending || form.state.isSubmitting}
          >
            Crear user
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserForm;
