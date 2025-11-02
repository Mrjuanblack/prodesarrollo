import React from "react";
import { ShieldAlert } from "lucide-react";
import { Container, Section } from "@/ui/molecules";
import { Text } from "@/ui/atoms";

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
        <div className="flex items-center border-3 border-[#E0E6F5] rounded-2xl py-7 shadow-sm gap-20 px-20">
          <div className="flex items-center justify-center rounded-full text-primary">
            <Icon size={50} className="text-primary" />
          </div>

          <Text text={message} className="text-[18px] text-justify" />
        </div>

        {children && (
          <div className="mt-20 flex justify-center">{children}</div>
        )}
      </Container>
    </Section>
  );
};
