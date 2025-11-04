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
            <div key={item.label} className="w-full mt-4">
              <p
                onClick={() => setActiveItem(item.label)}
                className={`text-lg font-bold mb-2 cursor-pointer ${
                  activeItem === item.label ? "text-primary" : "text-gray-800"
                }`}
              >
                {item.label}
              </p>
              <ul
                className={`pl-4 border-l-2 ${
                  activeItem === item.label
                    ? "border-primary"
                    : "border-gray-200"
                } space-y-1`}
              >
                {item.items.map((subItem) => (
                  <li
                    key={subItem.label}
                    className={`py-1 text-base cursor-pointer transition-colors ${
                      activeItem === subItem.label
                        ? "text-primary font-semibold"
                        : "text-gray-600 hover:text-primary"
                    }`}
                    onClick={() => {
                      setActiveItem(subItem.label);
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
                  variant="solid"
                  onClick={() => setActiveItem(item.label)}
                  className={`sm:text-[15px] md:text-[15px] lg:text-[20px] p-0 font-semibold relative bg-transparent flex items-center gap-1 ${
                    activeItem === item.label
                      ? "text-primary font-bold after:content-[''] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-secondary after:rounded-full"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openDropdown === item.label
                        ? "rotate-180 text-primary"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label={item.label}>
                {item.items.map((subItem) => (
                  <DropdownItem
                    key={subItem.label}
                    onClick={() => {
                      setActiveItem(subItem.label);
                      router.push(subItem.href);
                    }}
                    className={`sm:text-[15px] md:text-[15px] lg:text-[20px] ${
                      activeItem === subItem.label
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    {subItem.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )
        ) : (
          <NavbarItem key={item.label} className={isMobile ? "w-full" : ""}>
            <Button
              disableRipple
              variant="solid"
              onClick={() => {
                setActiveItem(item.label);
                if (item.href) router.push(item.href);
                if (isMobile) setIsMenuOpen(false);
              }}
              className={`p-0 sm:text-[15px] md:text-[15px] lg:text-[20px] font-semibold relative bg-transparent hover:bg-transparent after:transition-transform ${
                isMobile
                  ? `w-full justify-start text-lg py-3 text-left ${
                      activeItem === item.label
                        ? "text-primary font-bold"
                        : "text-gray-700 hover:text-primary"
                    }`
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
          <Image
            alt="GOV.CO"
            src={colombia_logo}
            className="h-7 md:h-9 md:w-[154px]"
          />
        </Container>
      </div>

      <Navbar
        maxWidth="2xl"
        className="text-primary py-5"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            className="lg:hidden text-primary"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          />

          <NavbarBrand className="w-[156px]">
            <Image
              alt="ProDesarrollo"
              src={pro_desarrollo_logo}
              className="h-auto w-[156px] ml-4 md:ml-0"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="gap-6 hidden lg:flex">
          {renderMenuItems(false)}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3 hidden xl:flex">
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
                className="rounded-full h-10 w-10 bg-primary-50 hover:bg-primary-200"
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
