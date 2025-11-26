"use client";

import React, { useEffect } from "react";
import { useLoader } from "./provider-loader";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePathname, useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, setToken } = useAuth();
  const { isLoading, setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    // const tokenCookie = getCookie("token");

    // if (!tokenCookie) {
    //   router.push("/auth/login");
    // } else {
    //   if (!token) {
    //     setToken(tokenCookie);
    //   }
    // }

    setLoading(false);
  }, [pathname]);

  if (isLoading === false) {
    return <>{children}</>;
  }

  return null;
}
