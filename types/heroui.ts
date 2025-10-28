export type Colors =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "foreground"
  | "default"
  | undefined;

export type ColorsLink = Exclude<Colors, "default">;
export type ColorsBtn = Exclude<Colors, "foreground">;

export type Size = "lg" | "sm" | "md" | undefined;

export type TypesBtn = "button" | "submit" | "reset" | undefined;

export type TypesInput =
  | "text"
  | "email"
  | "url"
  | "password"
  | "tel"
  | "search"
  | "file";

export type VariantsBtn =
  | "flat"
  | "solid"
  | "bordered"
  | "light"
  | "faded"
  | "shadow"
  | "ghost"
  | undefined;

export type labelPlacementInput =
  | "outside"
  | "outside-left"
  | "outside-top"
  | "inside"
  | undefined;
