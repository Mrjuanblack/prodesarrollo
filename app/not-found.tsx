"use client";

// Core
import { useRouter } from "next/navigation";

// Components
import { BackgroundSection, Button, Text, Title } from "@/ui/atoms";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <Title
        text="404"
        className="text-6xl text-primary mb-4"
        highlightFirstLetter={false}
      />

      <Title
        highlightFirstLetter={false}
        text="Página no encontrada"
        className="text-2xl font-semibold mb-2"
      />

      <Text
        className="text-gray-600 mb-6"
        text="Lo sentimos, la página que buscas no existe o fue movida."
      />

      <Button
        text="Volver al inicio"
        onClick={handleClick}
        className="w-fit text-white"
      />
      <BackgroundSection background="bg-white" />
    </div>
  );
}
