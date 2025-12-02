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

export const baseDonationFormSchema = z.object({
  donatioType: z.enum(DonationTypeOptions, {
    message: "El tipo de donación es requerido y debe ser una opción válida.",
  }),

  personType: z.enum(PersonTypeOptions, {
    message: "El tipo de persona es requerido y debe ser una opción válida.",
  }),

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

  email: z.email("El formato del correo electrónico no es válido."),

  anonymousDonation: z.string({
    message: "Debes indicar si la donación es anónima.",
  }),
});

export const materialDonationFormSchema = baseDonationFormSchema.extend({
  description: z.string().min(3, {
    message: "La descripción debe tener al menos 3 caracteres.",
  }),
});

export const economicDonationFormSchema = baseDonationFormSchema.extend({
  donateValue: z.number().min(20000, {
    message: "El valor de la donación debe ser al menos 20,000.",
  }),
});

export const baseDonationSchema = z.object({
  donatioType: z.enum(DonationTypeOptions, {
    message: "El tipo de donación es requerido y debe ser una opción válida.",
  }),

  personType: z.enum(PersonTypeOptions, {
    message: "El tipo de persona es requerido y debe ser una opción válida.",
  }),

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

  email: z.email("El formato del correo electrónico no es válido."),

  anonymousDonation: z.string({
    message: "Debes indicar si la donación es anónima.",
  }),
});

export const materialDonationSchema = baseDonationSchema.extend({
  description: z.string().min(3, {
    message: "La descripción debe tener al menos 3 caracteres.",
  }),
});

export const economicDonationSchema = baseDonationSchema.extend({
  donateValue: z.number().min(20000, {
    message: "El valor de la donación debe ser al menos 20,000.",
  }),
});

export type BaseDonationFormType = {
  email: string;
  phone: string;
  fullName: string;
  idNumber: string;
  idType: IdTypeOptions;
  anonymousDonation: string;
  personType: PersonTypeOptions;
  donatioType: DonationTypeOptions;
};

export type MaterialDonationFormType = BaseDonationFormType & {
  description: string;
};

export type EconomicDonationFormType = BaseDonationFormType & {
  donateValue?: number;
};

export type CreateDonationType = {
  email: string;
  phone: string;
  fullName: string;
  idNumber: string;
  idType: IdTypeOptions;
  anonymousDonation: string;
  personType: PersonTypeOptions;
  donatioType: DonationTypeOptions;
  donateValue?: number | undefined;
  description?: string | undefined;
};
