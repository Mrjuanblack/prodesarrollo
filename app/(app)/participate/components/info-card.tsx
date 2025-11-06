import React from "react";
import { Text } from "@/ui/atoms";
import { ShieldAlert } from "lucide-react";
import { Container, Section } from "@/ui/molecules";

interface InfoCardProps {
  message: string;
  Icon?: React.ElementType;
  children?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  message,
  children,
  Icon = ShieldAlert,
}) => {
  return (
    <Section fadeIn={true}>
      <Container>
        <div className="flex items-center border-3 border-[#E0E6F5] rounded-2xl py-7 shadow-sm gap-10 lg:gap-20 px-10 lg:px-20 flex-col lg:flex-row">
          <div className="flex items-center justify-center rounded-full text-primary">
            <Icon size={50} className="text-primary" />
          </div>

          <Text
            text={message}
            className="text-[15px] lg:text-[18px] text-justify"
          />
        </div>

        {children && (
          <div className="mt-10 lg:mt-20 flex justify-center">{children}</div>
        )}
      </Container>
    </Section>
  );
};
