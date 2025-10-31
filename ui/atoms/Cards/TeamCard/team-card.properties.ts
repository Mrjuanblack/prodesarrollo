export interface TeamMember {
  id: number;
  name: string;
  position: string;
  emailUrl?: string;
  profession: string;
  linkedinUrl?: string;
}

export interface TeamCardProps {
  item: TeamMember;
}
