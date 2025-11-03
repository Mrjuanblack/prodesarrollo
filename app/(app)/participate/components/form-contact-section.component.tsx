import { useState } from "react";
import { Button, FormCard } from "@/ui/atoms";
import { Input, Select, SelectItem } from "@heroui/react";

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
    <FormCard
      title="Ingresa la siguiente información"
      form={
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              size="lg"
              label="Tipo de identificación"
              placeholder="Selecciona una opción"
            >
              {idTypes.map((type) => (
                <SelectItem key={type.value} textValue={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>

            <Input size="lg" placeholder="" label="Número de identificación" />
          </div>

          <Input label="Nombre completo" placeholder="" size="lg" />

          <Input label="Teléfono" placeholder="" size="lg" />

          <Input
            size="lg"
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[20px]">
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
