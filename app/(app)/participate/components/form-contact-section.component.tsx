import { useState } from "react";
import { Button, FormCard, Input, Select } from "@/ui/atoms";

const idTypes = [
  { key: 1, label: "Cédula de ciudadanía", value: "cc" },
  { key: 2, label: "Tarjeta de identidad", value: "ti" },
  { key: 3, label: "Cédula de extranjería", value: "ce" },
  { key: 4, label: "Pasaporte", value: "pa" },
];

export const FormContactSection = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <FormCard
      title="Ingresa la siguiente información"
      form={
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Select
              options={idTypes}
              label="Tipo de identificación"
              placeholder="Selecciona una opción"
            />

            <Input placeholder="" label="Número de identificación" />
          </div>

          <Input label="Nombre completo" placeholder="" />

          <Input label="Teléfono" placeholder="" />

          <Input label="Correo electrónico" placeholder="ejemplo@correo.com" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[15px] lg:text-[20px]">
            <span className="text-black font-medium">
              Cargar archivos y/o imágenes de soporte
            </span>

            <label
              htmlFor="file-upload"
              className="text-secondary font-medium cursor-pointer underline hover:text-secondary-600"
            >
              Seleccionar archivos
            </label>

            <input
              multiple
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </>
      }
      buttonAction={
        <>
          <Button
            variant="solid"
            text="Enviar"
            className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
          />
        </>
      }
    />
  );
};

export default FormContactSection;
