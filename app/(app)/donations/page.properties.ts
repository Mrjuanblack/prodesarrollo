import { DonationTypeOptions, PersonTypeOptions } from "@/domain/donation";

export const donationTypes = [
  { key: 1, label: "Económica", value: DonationTypeOptions.ECONOMICA },
  { key: 2, label: "En especie", value: DonationTypeOptions.ESPECIE },
  {
    key: 3,
    label: "Servicios o mano de obra",
    value: DonationTypeOptions.SERVICIOS,
  },
  {
    key: 4,
    label: "Otra",
    value: DonationTypeOptions.OTRA,
  },
];

export const personTypes = [
  { key: 1, label: "Natural", value: PersonTypeOptions.NATURAL },
  { key: 2, label: "Jurídica", value: PersonTypeOptions.JURIDICA },
];

export const anonymousDonation = [
  { key: 1, label: "Sí", value: "si" },
  { key: 2, label: "No", value: "no" },
];

export const donationOptions = [
  {
    key: 1,
    label: "$20.000",
    value: 20000,
  },
  { key: 2, label: "$50.000", value: 50000 },
  { key: 3, label: "$100.000", value: 100000 },
  { key: 4, label: "$200.000", value: 200000 },
];
