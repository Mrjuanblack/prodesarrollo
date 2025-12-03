export interface ServiceItem {
  id: number;
  title: string;
  Icon: React.ElementType;
  description: React.ReactNode;
}

export interface ServiceCardProps {
  item: ServiceItem;
}
