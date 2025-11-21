"use client";

import { addToast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useLogin } from "@/hooks/auth/useLogin";
import { loginFormSchema } from "@/domain/auth";
import { Button, FormCard, Input } from "@/ui/atoms";

const LoginPage = () => {
  const loginMutation = useLogin();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: loginFormSchema,
      onSubmit: loginFormSchema,
      onChange: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value, {
        onError: () => {
          addToast({
            title: "Error al iniciar sesión",
            description: "Verifica tus datos e inténtalo nuevamente.",
            color: "danger",
          });
        },
        onSuccess: () => {
          form.reset();
          addToast({
            title: "Bienvenido",
            description: "Inicio de sesión exitoso.",
            color: "success",
          });
        },
      });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <FormCard
        onSubmit={form.handleSubmit}
        title="Inicia sesión en tu cuenta"
        className="rounded-xl p-6 max-w-md"
        form={
          <>
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
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    label="Contraseña"
                    canTogglePassword={true}
                    value={field.state.value ?? ""}
                    errorMessage={field.state.meta.errors[0]?.message}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                  />
                </div>
              )}
            </form.Field>
          </>
        }
        buttonAction={
          <div className="flex flex-col space-y-5">
            <Button
              type="submit"
              variant="solid"
              text="Iniciar sesión"
              isLoading={loginMutation.isPending}
              className="mt-4 bg-secondary hover:bg-secondary-400 w-full font-bold shadow-md"
              onClick={() => form.handleSubmit()}
              isDisabled={loginMutation.isPending || form.state.isSubmitting}
            />

            <div className="flex justify-between gap-2 mt-5 text-sm text-center text-primary">
              <a href="/about/contacts" className="hover:underline">
                Contáctanos
              </a>

              <span className="text-gray-300">|</span>

              <a href="/about/about-us" className="hover:underline">
                Conoce más
              </a>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LoginPage;
