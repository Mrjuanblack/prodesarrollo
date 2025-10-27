"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export default function ProviderHeroUi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      {children}
    </HeroUIProvider>
  );
}
