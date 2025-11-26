"use client";

import React, { useEffect } from "react";
import { useLoader } from "./provider-loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { getCookie } from "@/hooks/auth/cookie";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { token, setToken } = useAuth();
  const { isLoading, setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    const tokenCookie = getCookie("token");

    console.log("1");
    if (!tokenCookie) {
      console.log("2");
      router.push("/auth/login");
    } else {
      console.log("3");
      if (!token) {
        console.log("4");
        setToken(tokenCookie);
      }
    }

    setLoading(false);
  }, []);

  if (isLoading === false) {
    return <>{children}</>;
  }

  return null;
}
