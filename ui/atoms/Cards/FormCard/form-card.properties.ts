import React from "react";

export interface FormCardProps {
  title: string;
  className?: string;
  form: React.ReactNode;
  buttonAction: React.ReactNode;
}
