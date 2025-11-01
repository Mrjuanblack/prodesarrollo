export interface CallItem {
  id: number;
  titulo: string;
  descripcion: string;
  fechaApertura: string;
  estado: "En proceso" | "Finalizado";
  onViewProject?: () => void;
}

export interface CallCardProps {
  item: CallItem;
}
