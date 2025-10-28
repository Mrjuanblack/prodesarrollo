"use client";

import {
  Navbar,
  Button,
  Dropdown,
  NavbarItem,
  NavbarBrand,
  DropdownMenu,
  DropdownItem,
  NavbarContent,
  DropdownTrigger,
} from "@heroui/react";
import { Search, Instagram, Facebook, Youtube } from "lucide-react";

export const HeaderComponent = () => {
  return (
    <header className="w-full">
      {/* Barra superior GOV.CO */}
      <div className="bg-[#0B2D6B] text-white flex items-center justify-start px-8 py-2">
        <img src="/govco-logo.png" alt="GOV.CO" className="h-6" />
      </div>

      {/* Navbar principal */}
      <Navbar className="bg-white text-[#0B2D6B] px-8 shadow-sm">
        {/* Logo */}
        <NavbarContent justify="start" className="gap-6">
          <NavbarBrand className="flex items-center gap-2">
            <img
              src="/logo-prodesarrollo.png"
              alt="ProDesarrollo"
              className="h-10"
            />
          </NavbarBrand>
        </NavbarContent>

        {/* Enlaces principales */}
        <NavbarContent justify="center" className="gap-6">
          <NavbarItem>
            <Button
              variant="light"
              className="text-[#0B2D6B] font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0B2D6B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Inicio
            </Button>
          </NavbarItem>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="text-[#0B2D6B] font-semibold">
                Nosotros
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Nosotros">
              <DropdownItem>Quiénes somos</DropdownItem>
              <DropdownItem>Misión y visión</DropdownItem>
              <DropdownItem>Equipo</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Button variant="light" className="text-[#0B2D6B] font-semibold">
              Transparencia
            </Button>
          </NavbarItem>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="text-[#0B2D6B] font-semibold">
                Convocatorias
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Convocatorias">
              <DropdownItem>Abiertas</DropdownItem>
              <DropdownItem>Cerradas</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Button variant="light" className="text-[#0B2D6B] font-semibold">
              Noticias
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button variant="light" className="text-[#0B2D6B] font-semibold">
              PQRS
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Íconos redes sociales */}
        <NavbarContent justify="end" className="gap-3">
          <Button
            isIconOnly
            variant="light"
            className="rounded-full bg-[#F5F6FA] hover:bg-[#E1E3EC]"
          >
            <Search className="h-5 w-5 text-[#0B2D6B]" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            className="rounded-full bg-[#F5F6FA] hover:bg-[#E1E3EC]"
          >
            <Instagram className="h-5 w-5 text-[#0B2D6B]" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            className="rounded-full bg-[#F5F6FA] hover:bg-[#E1E3EC]"
          >
            <Facebook className="h-5 w-5 text-[#0B2D6B]" />
          </Button>
          <Button
            isIconOnly
            variant="light"
            className="rounded-full bg-[#F5F6FA] hover:bg-[#E1E3EC]"
          >
            <Youtube className="h-5 w-5 text-[#0B2D6B]" />
          </Button>
        </NavbarContent>
      </Navbar>
    </header>
  );
};
