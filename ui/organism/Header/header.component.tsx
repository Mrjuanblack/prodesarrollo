"use client";

import {
  Navbar,
  Divider,
  NavbarMenu,
  NavbarItem,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import { Link } from "@/ui/atoms";
import { useState } from "react";
import { navItems } from "./header.properties";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export function HeaderComponent() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    router.push("/home");
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <Navbar
      maxWidth="xl"
      disableAnimation
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="backdrop-blur-md shadow-sm"
    >
      <NavbarBrand>
        <Image
          width={160}
          height={160}
          alt="nexa code Logo"
          onClick={handleClick}
          src={"/public/favicon.png"}
          className="cursor-pointer"
        />
      </NavbarBrand>

      <NavbarContent justify="end">
        <div className="sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <div className="hidden sm:flex gap-6 items-center">
          {navItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link
                href={item.href}
                text={item.label}
                className={`font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "hover:text-primary"
                }`}
              />
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full z-50"
          >
            <NavbarMenu className="px-6 py-8 flex flex-col gap-6 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-b-2xl shadow-lg">
              <div className="flex flex-col gap-4 text-center">
                {navItems.map((item) => (
                  <NavbarMenuItem
                    key={item.label}
                    isActive={pathname === item.href}
                  >
                    <Link
                      size="lg"
                      text={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-medium ${
                        pathname === item.href
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                      }`}
                    />
                  </NavbarMenuItem>
                ))}
              </div>

              <Divider className="my-4" />
            </NavbarMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </Navbar>
  );
}
