import { Text } from "@/ui/atoms";
import { MapPin } from "lucide-react";
import { IconTitle } from "@/ui/molecules";
import { sedes } from "./sedes.properties";

export const SedesComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <IconTitle title="Sedes" Icon={MapPin} />
      </div>

      <div className="space-y-4 text-[15px] md:text-[18px] lg:text-[20px] text-center">
        {sedes.map((info) => {
          return (
            <div key={info.id}>
              <Text
                text={info.title}
                className="text-secondary font-semibold"
              />

              <Text className="text-primary" text={info.description} />
            </div>
          );
        })}
      </div>
    </>
  );
};
