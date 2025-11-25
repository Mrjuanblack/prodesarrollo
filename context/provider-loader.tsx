"use client";

import { GlobalLoader } from "@/ui/atoms";
import { createContext, useState, useContext, ReactNode } from "react";

interface LoaderContextType {
  isLoading?: boolean;
  setLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

interface LoaderProviderProps {
  children: ReactNode;
}

export default function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <GlobalLoader />}
    </LoaderContext.Provider>
  );
}
