import { z } from "zod/v4";
import { IdTypeOptions } from "./shared";

export const submitParticipateFormSchema = z.object({
  idType: z.enum(IdTypeOptions, {
    message:
      "El tipo de identificación es requerido y debe ser una opción válida.",
  }),

  idNumber: z
    .string({ message: "El número de identificación es requerido." })
    .min(5, "El número de identificación debe tener al menos 5 caracteres.")
    .max(15, "El número de identificación no debe exceder los 15 caracteres."),

  fullName: z
    .string({ message: "El nombre completo es requerido." })
    .min(3, "El nombre debe tener al menos 3 caracteres."),

  phone: z
    .string({ message: "El número de teléfono es requerido." })
    .min(7, "El teléfono debe tener al menos 7 dígitos."),

  email: z
    .string({ message: "El correo electrónico es requerido." })
    .email("El formato del correo electrónico no es válido."),
});

export type SubmitParticipateFormType = {
  idType: IdTypeOptions;
  idNumber: string;
  fullName: string;
  phone: string;
  email: string;
};
