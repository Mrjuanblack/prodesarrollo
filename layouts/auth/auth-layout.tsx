import Image from "next/image";
import React, { FC } from "react";
import { Container } from "@/ui/molecules";
import colombia_logo from "@/public/gov-co-logo.svg";

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
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
      </header>

      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
