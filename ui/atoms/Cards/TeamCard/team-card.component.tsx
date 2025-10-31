import React from "react";
import { Linkedin, Mail, User } from "lucide-react";
import { TeamCardProps } from "./team-card.properties";

export const TeamCardComponent: React.FC<TeamCardProps> = ({ item }) => {
  const { name, profession, position, linkedinUrl, emailUrl } = item;

  return (
    <div className="flex items-center justify-between bg-[#F5F8FF] rounded-2xl p-6 shadow-sm border border-[#E0E6F1] hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-7">
        <div className="flex items-center justify-center w-[125px] h-[125px] rounded-full border-3 border-primary-200">
          <User size={70} strokeWidth={1.5} className="text-primary-200" />
        </div>

        <div className="text-primary text-[18px] leading-snug">
          <p>{name}</p>
          <p>{profession}</p>
          <p>Cargo: {position}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-xl w-[50px] h-[50px] rounded-full flex items-center justify-center text-primary transition-transform hover:scale-105"
          >
            <Linkedin size={16} strokeWidth={2} />
          </a>
        )}

        {emailUrl && (
          <a
            href={`mailto:${emailUrl}`}
            className="shadow-xl w-[50px] h-[50px] rounded-full flex items-center justify-center text-primary transition-transform hover:scale-105"
          >
            <Mail size={16} strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  );
};
