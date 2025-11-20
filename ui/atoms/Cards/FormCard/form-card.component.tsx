import React from "react";
import { Title } from "../..";
import { Card, CardBody } from "@heroui/react";
import { FormCardProps } from "./form-card.properties";

export const FormCardComponent: React.FC<FormCardProps> = ({
  form,
  title,
  buttonAction,
  className = "rounded-2xl",
  onSubmit,
}) => {
  return (
    <Card
      className={`bg-[#F5F8FF] p-4 md:p-6 lg:p-8 w-full shadow-md border-none ${className}`}
    >
      <CardBody>
        <Title
          text={title}
          highlightFirstLetter={false}
          className="text-primary font-semibold"
        />

        <form
          className="my-10 space-y-2 lg:space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          {form}

          <div className="flex justify-center">{buttonAction}</div>
        </form>
      </CardBody>
    </Card>
  );
};
