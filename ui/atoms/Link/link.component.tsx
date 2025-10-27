// Core
import React, { JSX } from "react";
import { Link } from "@heroui/react";
import { useRouter } from "next/navigation";

// Properties
import { LinkProperties } from "./link.properties";

export const LinkComponent = (properties: LinkProperties): JSX.Element => {
  const router = useRouter();

  const { className, color, size, href, text, isExternal, children, onClick } =
    properties;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      size={size ?? "md"}
      onClick={handleClick}
      isExternal={isExternal}
      className={`${className} cursor-pointer`}
      color={color ?? "foreground"}
    >
      {children ?? text}
    </Link>
  );
};
