import {
  Button,
  Navbar,
  Dropdown,
  NavbarItem,
  NavbarMenu,
  NavbarBrand,
  DropdownItem,
  DropdownMenu,
  NavbarContent,
  DropdownTrigger,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/ui/molecules";
import { useRouter } from "next/navigation";
import colombia_logo from "@/public/gov-co-logo.svg";
import { menuItems, socialItems } from "./header.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo.svg";

export const HeaderHomeComponent = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("Inicio");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderMenuItems = (isMobile = false) => (
    <>
      {menuItems.map((item) =>
        item.type === "dropdown" ? (
          isMobile ? (
            <div key={item.label} className="w-full">
              <p className="text-lg font-bold text-primary mb-2 mt-4 cursor-pointer">
                {item.label}
              </p>
              <ul className="pl-4 border-l-2 border-gray-200">
                {item.items.map((subItem) => (
                  <li
                    key={subItem.label}
                    className="py-1 text-gray-600 text-base hover:text-primary transition-colors cursor-pointer"
                    onClick={() => {
                      router.push(subItem.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {subItem.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Dropdown
              key={item.label}
              onOpenChange={(isOpen) =>
                setOpenDropdown(isOpen ? item.label : null)
              }
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  variant="light"
                  onClick={() => setActiveItem(item.label)}
                  className={`text-[18px] font-semibold relative bg-transparent flex items-center gap-1 ${
                    activeItem === item.label
                      ? "text-primary font-bold after:content-[''] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-secondary after:rounded-full"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform text-gray-600 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={item.label}>
                {item.items.map((subItem) => (
                  <DropdownItem
                    key={subItem.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      router.push(subItem.href);
                    }}
                  >
                    <p className="text-[18px]">{subItem.label}</p>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )
        ) : (
          <NavbarItem key={item.label} className={isMobile ? "w-full" : ""}>
            <Button
              disableRipple
              variant="light"
              onClick={() => {
                setActiveItem(item.label);
                if (item.href) router.push(item.href);
                if (isMobile) setIsMenuOpen(false);
              }}
              className={`text-[18px] font-semibold relative bg-transparent after:transition-transform ${
                isMobile
                  ? "w-full justify-start text-lg py-3 hover:bg-gray-100"
                  : activeItem === item.label
                  ? "text-primary font-bold after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-secondary after:rounded-full"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.label}
            </Button>
          </NavbarItem>
        )
      )}
    </>
  );

  return (
    <header className="w-full">
      <div className="bg-primary flex items-center justify-start py-1">
        <Container>
          <Image src={colombia_logo} alt="GOV.CO" className="h-9 w-[154px]" />
        </Container>
      </div>

      <Navbar
        className="text-primary py-5"
        maxWidth="2xl"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden text-primary"
          />

          <NavbarBrand>
            <Image
              alt="ProDesarrollo"
              src={pro_desarrollo_logo}
              className="h-auto w-[156px] ml-4 md:ml-0"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="gap-6 hidden md:flex">
          {renderMenuItems(false)}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3 hidden md:flex">
          {socialItems.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex justify-center items-center rounded-full h-[50px] w-[50px] bg-primary-50 hover:bg-primary-200"
            >
              <Icon className="h-7 w-7 text-primary" strokeWidth="2" />
            </a>
          ))}
        </NavbarContent>

        <NavbarMenu className="pt-4 px-4 bg-white">
          <div className="flex flex-col gap-2">{renderMenuItems(true)}</div>

          <div className="mt-8 pt-4 border-t border-gray-100 flex gap-4 justify-start">
            {socialItems.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                isIconOnly
                variant="light"
                aria-label={label}
                className="rounded-full h-[40px] w-[40px] bg-primary-50 hover:bg-primary-200"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth="2" />
              </Button>
            ))}
          </div>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};
