import Image from "next/image";
import React, { FC, useMemo } from "react";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { addToast, Button } from "@heroui/react";
import { useLogout } from "@/hooks/auth/useLogout";
import { usePathname, useRouter } from "next/navigation";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo.svg";
import {
  HomeIcon,
  NewspaperIcon,
  PhotoIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  canManageHomeCarousel,
  canManageNews,
  canManageProjects,
  canManageUsers,
  UserRole,
} from "@/domain/user";

const PrivateLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const { loading, setLoading, logout, user } = useAuth();

  const isActive = (href: string) => pathname.endsWith(href);

  const internalPrefix = "/internal";

  // Hide nav items the current role can't access. ADMIN sees everything;
  // ADMIN_PROJECTS only sees Proyectos; ADMIN_NEWS only sees Noticias.
  const routes = useMemo(() => {
    const role = (user?.role as UserRole | undefined) ?? null;

    const all = [
      {
        label: "Dashboard",
        icon: HomeIcon,
        href: internalPrefix,
        visible: true,
      },
      {
        label: "Proyectos",
        icon: DocumentDuplicateIcon,
        href: `${internalPrefix}/projects`,
        visible: role ? canManageProjects(role) : false,
      },
      {
        label: "Noticias",
        icon: NewspaperIcon,
        href: `${internalPrefix}/news`,
        visible: role ? canManageNews(role) : false,
      },
      {
        label: "Carrusel home",
        icon: PhotoIcon,
        href: `${internalPrefix}/home-carousel`,
        visible: role ? canManageHomeCarousel(role) : false,
      },
      {
        label: "Usuarios",
        icon: UsersIcon,
        href: `${internalPrefix}/users`,
        visible: role ? canManageUsers(role) : false,
      },
    ];

    return all.filter((route) => route.visible);
  }, [user?.role]);

  const userLogout = async () => {
    setLoading(true);

    try {
      await logoutMutation.mutateAsync();

      logout();

      addToast({
        color: "success",
        title: "Sesión Cerrada",
        description: "Has cerrado sesión exitosamente. ¡Vuelve pronto!",
      });

      router.push("/auth/login");
    } catch {
      addToast({
        color: "danger",
        title: "Error al cerrar sesión",
        description:
          "Hubo un problema al intentar cerrar la sesión. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-70 h-full border-r border-gray-200">
        <button
          type="button"
          aria-label="Ir al dashboard"
          onClick={() => router.push(internalPrefix)}
          className="w-full flex justify-center items-center py-4 cursor-pointer hover:bg-default-50 transition-colors"
        >
          <Image alt="logo" width={200} height={0} src={pro_desarrollo_logo} />
        </button>

        <div className="flex flex-col gap-2 px-4">
          {routes.map((route) => (
            <Button
              size="lg"
              color="primary"
              key={route.href}
              style={{ justifyContent: "flex-start" }}
              onClick={() => router.push(route.href)}
              variant={isActive(route.href) ? "solid" : "light"}
              startContent={<route.icon className="w-6 h-6" />}
            >
              {route.label}
            </Button>
          ))}

          <Button
            size="lg"
            color="primary"
            variant="bordered"
            isLoading={loading}
            isDisabled={loading}
            style={{ justifyContent: "flex-start" }}
            startContent={<LogOutIcon className="w-6 h-6" />}
            onClick={() => {
              userLogout();
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PrivateLayout;
