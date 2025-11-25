"use client";

import { usePathname } from "next/navigation";
import PublicLayout from "@/layouts/public/public-layout";
import PrivateLayout from "@/layouts/private/private-layout";
import AuthLayout from "@/layouts/auth/auth-layout";

interface ProviderAppShellProps {
  children: React.ReactNode;
}

export default function ProviderAppShell({ children }: ProviderAppShellProps) {
  const pathname = usePathname();

  const isInternal = pathname.startsWith("/internal");
  const isAuth = pathname.startsWith("/auth");

  return isInternal ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : isAuth ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
}
