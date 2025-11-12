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
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/ui/molecules";
import colombia_logo from "@/public/gov-co-logo.svg";
import { menuItems, socialItems } from "./header.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { Button as MyButton } from "@/ui/atoms";

export const HeaderHomeComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentPathName = pathname.split("/")?.[1];

  const [activeItem, setActiveItem] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveItem(currentPathName);
  }, [currentPathName]);

  const renderMenuItems = (isMobile = false) => (
    <>
      {menuItems.map((item) =>
        item.type === "dropdown" ? (
          isMobile ? (
            <div key={item.key} className="w-full">
              <p
                onClick={() => setActiveItem(item.key)}
                className={`text-[15px] md:text-[18px] font-bold mb-2 cursor-pointer ${
                  activeItem === item.key ? "text-primary" : "text-gray-800"
                }`}
              >
                {item.label}
              </p>

              <ul
                className={`pl-4 border-l-2 ${
                  activeItem === item.key ? "border-primary" : "border-gray-200"
                } space-y-2`}
              >
                {item.items.map((subItem) => (
                  <li
                    key={subItem.key}
                    className={`text-[15px] md:text-[18px] cursor-pointer transition-colors ${
                      activeItem === subItem.key
                        ? "text-primary font-semibold"
                        : "text-gray-600 hover:text-primary"
                    }`}
                    onClick={() => {
                      setActiveItem(subItem.key);
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
              key={item.key}
              onOpenChange={(isOpen) =>
                setOpenDropdown(isOpen ? item.label : null)
              }
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  variant="solid"
                  onClick={() => setActiveItem(item.key)}
                  className={`text-[15px] md:text-[18px] p-0 font-semibold relative bg-transparent flex items-center gap-1 ${
                    activeItem === item.key
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

              <DropdownMenu aria-label={item.key}>
                {item.items.map((subItem) => (
                  <DropdownItem
                    key={subItem.key}
                    onClick={() => {
                      setActiveItem(subItem.key);
                      router.push(subItem.href);
                    }}
                    className={`text-[15px] md:text-[18px] ${
                      activeItem === subItem.key
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
          <NavbarItem key={item.key} className={isMobile ? "w-full" : ""}>
            <Button
              disableRipple
              variant="solid"
              onClick={() => {
                setActiveItem(item.key);
                if (item.href) router.push(item.href);
                if (isMobile) setIsMenuOpen(false);
              }}
              className={`p-0 text-[15px] md:text-[18px] font-semibold relative bg-transparent hover:bg-transparent after:transition-transform ${
                isMobile
                  ? `w-full justify-start py-3 text-left ${
                      activeItem === item.key
                        ? "text-primary font-bold"
                        : "text-gray-700 hover:text-primary"
                    }`
                  : activeItem === item.key
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
      <div className="bg-primary flex items-center py-1 lg:py-2">
        <Container>
          <Image
            alt="GOV.CO"
            src={colombia_logo}
            className="h-[18px] md:h-[27px] lg:h-[36px] w-fit"
          />
        </Container>
      </div>

      <Navbar
        maxWidth="2xl"
        isMenuOpen={isMenuOpen}
        className="text-primary lg:py-2 xl:py-3"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            className="lg:hidden text-primary"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          />

          <NavbarBrand className="h-[35px] lg:h-[62px]">
            <Image
              alt="ProDesarrollo"
              src={pro_desarrollo_logo}
              className="h-[35px] lg:h-[62px]"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          justify="center"
          className="gap-3 lg:gap-4 xl:gap-6 hidden lg:flex"
        >
          {renderMenuItems(false)}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2 hidden xl:flex">
          {socialItems.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex justify-center items-center rounded-full h-[35px] w-[35px] lg:h-[50px] lg:w-[50px] bg-primary-50 hover:bg-primary-200"
            >
              <Icon className="h-6 w-6 text-primary" strokeWidth="2" />
            </a>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2 md:hidden">
          <MyButton
            variant="solid"
            text="Quiero donar"
            className="font-semibold w-fit bg-secondary shadow-lg"
            onClick={() => console.log("Navegar a noticias")}
          />
        </NavbarContent>

        <NavbarMenu className="pt-10 bg-white">
          <div className="flex flex-col">{renderMenuItems(true)}</div>

          <div className="mt-6 pt-8 border-t border-gray-100 flex gap-2 justify-start">
            {socialItems.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full h-[50px] w-[50px] bg-primary-50 hover:bg-primary-200 flex items-center justify-center"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth="2" />
              </a>
            ))}
          </div>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};
