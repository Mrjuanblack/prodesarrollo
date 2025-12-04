export interface InfoItem {
  id: number;
  title: string;
  description: string;
  Icon: React.ElementType;
}

export interface InfoCardProps {
  item: InfoItem;
}
