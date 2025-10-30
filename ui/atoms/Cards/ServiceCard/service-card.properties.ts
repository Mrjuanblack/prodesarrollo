export interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  description: React.ReactNode;
}

export interface ServiceCardProps {
  item: ServiceItem;
}
