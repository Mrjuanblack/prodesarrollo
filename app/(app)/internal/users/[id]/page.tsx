"use client";

import { useState } from "react";
import { GlobalLoader } from "@/ui/atoms";
import { useParams } from "next/navigation";
import useUser from "@/hooks/users/useUser";
import { useForm } from "@tanstack/react-form";
import { Container, Section } from "@/ui/molecules";
import { addToast, Button, Input } from "@heroui/react";
import { useUpdateUser } from "@/hooks/users/useUpdateCreate";
import { UpdateFormUser, updateUserFormSchema } from "@/domain/user";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const UserEdit = () => {
  const { id } = useParams();
  const { data: user } = useUser(id as string);

  const [showPassword, setShowPassword] = useState(false);

  const finalType = showPassword ? "text" : "password";

  const updateUserMutation = useUpdateUser({
    id: id as string,
    user: {
      email: user?.email ?? "",
      username: user?.username ?? "",
    } satisfies UpdateFormUser,
  });

  const defaultValues: UpdateFormUser = {
    email: user?.email ?? "",
    username: user?.username ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: updateUserFormSchema,
      onSubmit: updateUserFormSchema,
      onChange: updateUserFormSchema,
    },
    onSubmit: (values) => {
      updateUserMutation.mutate(
        {
          id: id as string,
          user: values.value,
        },
        {
          onError: () => {
            addToast({
              title: "Error al actualizar el usuario",
              description: "Por favor verifica tus datos.",
              color: "danger",
            });
          },
          onSuccess: () => {
            form.reset();
            addToast({
              title: "Actualización exitosa",
              description: "El usuario ha sido actualizado correctamente.",
              color: "success",
            });
          },
        }
      );
    },
  });

  if (!user) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <Section>
        <Container>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <h2 className="text-sm text-gray-500 mb-4">{user.id}</h2>

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
                    onBlur={field.handleBlur}
                    type={finalType ?? "text"}
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
                        className="focus:outline-none"
                        onClick={() => setShowPassword((prev) => !prev)}
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
              <div className="col-span-2">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={updateUserMutation.isPending}
                  isDisabled={
                    updateUserMutation.isPending || form.state.isSubmitting
                  }
                >
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </Section>
    </div>
  );
};

export default UserEdit;
