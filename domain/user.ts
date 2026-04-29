import { z } from "zod/v4";

export enum UserRole {
  ADMIN = "admin",
  ADMIN_PROJECTS = "admin_projects",
  ADMIN_NEWS = "admin_news",
}

export const userRoleList = Object.values(UserRole);

export const getUserRoleLabel = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrador total";
    case UserRole.ADMIN_PROJECTS:
      return "Administrador de proyectos";
    case UserRole.ADMIN_NEWS:
      return "Administrador de noticias";
  }
};

// Hierarchy helpers shared by client and server. ADMIN can do anything; the
// specialised roles can only manage their own domain.
export const canManageProjects = (role: UserRole): boolean =>
  role === UserRole.ADMIN || role === UserRole.ADMIN_PROJECTS;

export const canManageNews = (role: UserRole): boolean =>
  role === UserRole.ADMIN || role === UserRole.ADMIN_NEWS;

export const canManageUsers = (role: UserRole): boolean =>
  role === UserRole.ADMIN;

export const canManageHomeCarousel = (role: UserRole): boolean =>
  role === UserRole.ADMIN;

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

    role: z.enum(UserRole, { message: "Rol inválido" }),
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

  role: z.enum(UserRole, { message: "Rol inválido" }),
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

  role: z.enum(UserRole, { message: "Rol inválido" }),
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

  role: z.enum(UserRole, { message: "Rol inválido" }),

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
  role: UserRole;
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
