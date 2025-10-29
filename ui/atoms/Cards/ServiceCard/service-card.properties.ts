export interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface ServiceCardProps {
  item: ServiceItem;
}
