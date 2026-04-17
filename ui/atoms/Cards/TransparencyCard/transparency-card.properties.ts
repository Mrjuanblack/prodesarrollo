export interface TransparencyItem {
  id: number;
  title: string;
  description: string;
  Icon?: React.ElementType;
}

export interface TransparencyCardProps {
  item: TransparencyItem;
  active?: boolean;
  onClick?: (item: TransparencyItem) => void;
}
