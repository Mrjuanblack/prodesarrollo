import {
  Button,
  Navbar,
  Dropdown,
  NavbarItem,
  NavbarBrand,
  DropdownItem,
  DropdownMenu,
  NavbarContent,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/ui/molecules";
import { useRouter } from "next/navigation";
import colombia_logo from "@/public/gov-co-logo.svg";
import { menuItems, socialItems } from "./header.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo.svg";

export const HeaderComponent = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("Inicio");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="w-full">
      <div className="bg-primary flex items-center justify-start py-1">
        <Container>
          <Image src={colombia_logo} alt="GOV.CO" className="h-9 w-[154px]" />
        </Container>
      </div>

      <Navbar className="text-primary py-5" maxWidth="2xl">
        <NavbarContent justify="start">
          <NavbarBrand>
            <Image
              alt="ProDesarrollo"
              src={pro_desarrollo_logo}
              className="h-auto w-[156px]"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="gap-6">
          {menuItems.map((item) =>
            item.type === "dropdown" ? (
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
            ) : (
              <NavbarItem key={item.label}>
                <Button
                  disableRipple
                  variant="light"
                  onClick={() => {
                    setActiveItem(item.label);
                    if (item.href) router.push(item.href);
                  }}
                  className={`text-[18px] font-semibold relative bg-transparent after:transition-transform ${
                    activeItem === item.label
                      ? "text-primary font-bold after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:bg-secondary after:rounded-full"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            )
          )}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-3">
          {socialItems.map(({ icon: Icon, label }) => (
            <Button
              key={label}
              isIconOnly
              variant="light"
              aria-label={label}
              className="rounded-full h-[50px] w-[50px] bg-primary-50 hover:bg-primary-200"
            >
              <Icon className="h-7 w-7 text-primary" strokeWidth="2" />
            </Button>
          ))}
        </NavbarContent>
      </Navbar>
    </header>
  );
};
