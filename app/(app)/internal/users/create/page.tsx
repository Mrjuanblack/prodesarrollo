"use client";

import { addToast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { Button, FormCard, Input } from "@/ui/atoms";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { createUserFormSchema, CreateUserFormType } from "@/domain/user";

const UserCreate = () => {
  const registerMutation = useCreateUser();

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
    <div>
      <FormCard
        onSubmit={form.handleSubmit}
        title="Crear una cuenta"
        className="rounded-xl p-6 max-w-md"
        form={
          <>
            <form.Field name="username">
              {(field) => (
                <Input
                  id="username"
                  type="text"
                  label="Nombre de usuario"
                  placeholder="Tu usuario"
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
                  type="password"
                  label="Contraseña"
                  onBlur={field.handleBlur}
                  canTogglePassword={true}
                  value={field.state.value ?? ""}
                  errorMessage={field.state.meta.errors[0]?.message}
                  onChange={(e) => field.handleChange(e.target.value)}
                  isInvalid={
                    field.state.meta.errors.length > 0 &&
                    field.state.meta.isTouched
                  }
                />
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <Input
                  type="password"
                  id="confirmPassword"
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
          </>
        }
        buttonAction={
          <div className="flex flex-col space-y-5">
            <Button
              type="submit"
              variant="solid"
              text="Registrarme"
              onClick={() => form.handleSubmit()}
              isLoading={registerMutation.isPending}
              className="mt-4 bg-secondary hover:bg-secondary-400 w-full font-bold shadow-md"
              isDisabled={registerMutation.isPending || form.state.isSubmitting}
            />
          </div>
        }
      />
    </div>
  );
};

export default UserCreate;
