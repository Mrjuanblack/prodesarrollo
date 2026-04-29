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

  const isInternal = pathname.startsWith("/internal");

  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);

    validateMutation.mutate(undefined, {
      onError: () => {
        if (isInternal) {
          addToast({
            color: "danger",
            title: "Sesión Expirada",
            description:
              "Tu sesión ha expirado o es inválida. Inicia sesión nuevamente.",
          });

          logout();
          router.replace("/auth/login");
        }
      },
      onSuccess: (user) => {
        setUser(user);

        if (!isInternal) {
          router.replace("/internal");
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Render children unconditionally. The GlobalLoader from LoaderProvider
  // already covers the screen while validation is in flight, so the user
  // doesn't see flashes of unauthenticated content. Returning null here
  // (the previous behavior) caused the entire app subtree to mount/unmount
  // every time `isLoading` flipped, which in Next 16's app router triggers
  // "Rendered more hooks than during the previous render" inside the Router
  // component as it re-evaluates memoized segments.
  return <>{children}</>;
}
