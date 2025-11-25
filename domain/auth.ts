import { z } from "zod/v4";
import { User } from "./user";

export const loginFormSchema = z.object({
  password: z
    .string({ message: "La contraseña es requerida." })
    .min(3, "La contraseña debe tener al menos 3 caracteres."),

  email: z
    .string({ message: "El correo electrónico es requerido." })
    .email("El formato del correo electrónico no es válido."),
});

export type LoginFormType = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};
