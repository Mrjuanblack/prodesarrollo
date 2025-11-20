import React from "react";

export interface FormCardProps {
  title: string;
  className?: string;
  form: React.ReactNode;
  onSubmit: () => Promise<void>;
  buttonAction: React.ReactNode;
}
