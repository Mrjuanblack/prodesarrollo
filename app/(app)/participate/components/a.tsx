"use client";

import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

const idTypes = [
  { label: "Cédula de ciudadanía", value: "cc" },
  { label: "Tarjeta de identidad", value: "ti" },
  { label: "Cédula de extranjería", value: "ce" },
  { label: "Pasaporte", value: "pa" },
];

export const FormContactSection = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <Card className="bg-[#F5F8FF] rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-auto shadow-none border-none">
      <CardBody className="space-y-6">
        <h2 className="text-primary text-lg font-semibold border-b border-transparent">
          Ingresa la siguiente información
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Tipo de identificación"
            placeholder="Selecciona una opción"
            className="bg-white"
          >
            {idTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Número de identificación"
            placeholder=""
            className="bg-white"
          />
        </div>

        <Input label="Nombre completo" placeholder="" className="bg-white" />
        <Input label="Teléfono" placeholder="" className="bg-white" />
        <Input
          label="Correo electrónico"
          placeholder="ejemplo@correo.com"
          className="bg-white"
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span className="text-black font-medium">
            Cargar archivos y/o imágenes de soporte
          </span>
          <label
            htmlFor="file-upload"
            className="text-[#9CA9FF] font-medium cursor-pointer hover:underline"
          >
            Seleccionar archivos
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button
            color="primary"
            className="text-white font-semibold rounded-full shadow-sm px-10 py-2"
          >
            Enviar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormContactSection;
