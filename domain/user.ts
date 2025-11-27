import { z } from "zod/v4";

export const createUserFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

    email: z.string().email("El correo electrónico no es válido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe incluir al menos una letra minúscula")
      .regex(/[0-9]/, "Debe incluir al menos un número")
      .regex(/[^A-Za-z0-9]/, "Debe incluir un carácter especial"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

  email: z.string().email("El correo electrónico no es válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe incluir al menos una letra minúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe incluir un carácter especial"),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const updateUserFormSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

  email: z.string().email("El correo electrónico no es válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe incluir al menos una letra minúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe incluir un carácter especial")
    .optional(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

  email: z.string().email("El correo electrónico no es válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe incluir al menos una letra minúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe incluir un carácter especial")
    .optional(),

  updatedAt: z
    .date({ message: "La fecha debe ser una fecha válida" })
    .optional(),
});

export type UpdateFormUser = z.infer<typeof updateUserFormSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type CreateUserFormType = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};

export interface User
  extends Omit<CreateUserFormType, "password" | "confirmPassword"> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrivateUser
  extends Omit<CreateUserFormType, "confirmPassword"> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
