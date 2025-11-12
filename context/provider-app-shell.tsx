"use client";

import { Footer, Header } from "@/ui/organism";
import { Button } from "@heroui/react";
import {
  ChartBarSquareIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

interface ProviderAppShellProps {
  children: React.ReactNode;
}

export default function ProviderAppShell({ children }: ProviderAppShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isInternal = pathname.startsWith("/internal");
  const isActive = (href: string) => pathname.endsWith(href);

  const internalPrefix = "/internal";
  const routes = [
    {
      label: "Proyectos",
      icon: DocumentDuplicateIcon,
      href: `${internalPrefix}/projects`,
    },
  ];

  const internalLayout = (
    <div className="flex h-screen">
      <div className="w-70 h-full border-r border-gray-200">
        <div className="flex justify-center items-center py-4">
          <img src="/pro-desarrollo-logo.svg" alt="logo" width={200} />
        </div>
        <div className="flex flex-col gap-2 px-4">
          {routes.map((route) => (
            <Button
              size="lg"
              style={{ justifyContent: "flex-start" }}
              key={route.href}
              variant={isActive(route.href) ? "solid" : "light"}
              color="primary"
              startContent={<route.icon className="w-6 h-6" />}
              onClick={() => router.push(route.href)}
            >
              {route.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );

  const publicLayout = (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );

  return isInternal ? internalLayout : publicLayout;
}
