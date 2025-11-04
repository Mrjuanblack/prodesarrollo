import React from "react";
import { Title } from "../..";
import { Card, CardBody } from "@heroui/react";
import { FormCardProps } from "./form-card.properties";

export const FormCardComponent: React.FC<FormCardProps> = ({
  form,
  title,
  buttonAction,
}) => {
  return (
    <Card className="bg-[#F5F8FF] rounded-2xl p-6 md:p-8 w-full shadow-md border-none">
      <CardBody className="space-y-6">
        <Title
          text={title}
          highlightFirstLetter={false}
          className="text-primary md:text-[20px] font-semibold"
        />
        {form}
        <div className="flex justify-center mt-4">{buttonAction}</div>
      </CardBody>
    </Card>
  );
};
