"use client";

import React, { useEffect } from "react";
import { addToast } from "@heroui/react";
import { useLoader } from "./provider-loader";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useValidateUser } from "@/hooks/auth/useValidate";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, logout } = useAuth();
  const validateMutation = useValidateUser();

  const { isLoading, setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);

    validateMutation.mutate(undefined, {
      onError: () => {
        addToast({
          title: "Sesión Expirada",
          description:
            "Tu sesión ha expirado o es inválida. Inicia sesión nuevamente.",
          color: "danger",
        });

        logout();
        router.replace("/auth/login");
      },
      onSuccess: (user) => {
        setUser(user);
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  }, [pathname]);

  if (isLoading === false) {
    return <>{children}</>;
  }

  return null;
}
