import { z } from "zod/v4";

export const sendRequestFormSchema = z.object({
  fullName: z
    .string({ message: "El nombre completo es requerido." })
    .min(3, "El nombre debe tener al menos 3 caracteres."),

  phone: z
    .string({ message: "El número de teléfono es requerido." })
    .min(7, "El teléfono debe tener al menos 7 dígitos."),

  email: z
    .string({ message: "El correo electrónico es requerido." })
    .email("El formato del correo electrónico no es válido."),

  description: z
    .string({ message: "La descripción es requerida." })
    .min(3, "La descripción debe tener al menos 3 caracteres."),
});

export type SendRequestFormType = {
  phone: string;
  email: string;
  fullName: string;
  description: string;
};
