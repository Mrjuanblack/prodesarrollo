"use client";

import { Footer, Header } from "@/ui/organism";

interface ProviderAppShellProps {
  children: React.ReactNode;
}

export default function ProviderAppShell({ children }: ProviderAppShellProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
