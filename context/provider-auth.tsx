"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { validate } = useAuth();

  useEffect(() => {
    validate();
  }, [validate]);

  return <>{children}</>;
};
