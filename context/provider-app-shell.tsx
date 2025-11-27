"use client";

import AuthProvider from "./provider-auth";
import { usePathname } from "next/navigation";
import AuthLayout from "@/layouts/auth/auth-layout";
import PublicLayout from "@/layouts/public/public-layout";
import PrivateLayout from "@/layouts/private/private-layout";

interface ProviderAppShellProps {
  children: React.ReactNode;
}

export default function ProviderAppShell({ children }: ProviderAppShellProps) {
  const pathname = usePathname();

  const isInternal = pathname.startsWith("/internal");
  const isAuth = pathname.startsWith("/auth");

  return isInternal ? (
    <AuthProvider>
      <PrivateLayout>{children}</PrivateLayout>
    </AuthProvider>
  ) : isAuth ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
}
