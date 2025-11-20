import { z } from "zod/v4";
import { IdTypeOptions } from "./shared";

export enum DonationTypeOptions {
  ECONOMICA = "economica",
  ESPECIE = "en especie",
  SERVICIOS = "servicios o mano de obra",
  OTRA = "otra",
}

export enum PersonTypeOptions {
  NATURAL = "natural",
  JURIDICA = "juridica",
}

export const createDonationSchema = z.object({
  donatioType: z
    .enum(DonationTypeOptions, {
      message: "El tipo de donación es requerido y debe ser una opción válida.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "El tipo de donación es requerido.",
      path: ["donationType"],
    }),

  personType: z
    .enum(PersonTypeOptions, {
      message: "El tipo de persona es requerido y debe ser una opción válida.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "El tipo de persona es requerido.",
      path: ["personType"],
    }),

  idType: z
    .enum(IdTypeOptions, {
      message:
        "El tipo de identificación es requerido y debe ser una opción válida.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "El tipo de identificación es requerido.",
      path: ["idType"],
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

  description: z
    .string()
    .nullable()
    .refine((val) => val === null || val.length >= 3, {
      message: "La descripción debe tener al menos 3 caracteres.",
    }),

  anonymousDonation: z.string(),

  donateValue: z
    .number()
    .nullable()
    .refine((val) => val === null || val >= 20000, {
      message: "El valor de la donación debe ser al menos 20,000.",
    }),
});

export type CreateDonation = z.infer<typeof createDonationSchema>;
