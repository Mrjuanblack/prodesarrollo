export interface ProjectItem {
  id: number;
  date: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ProjectCardProps {
  item: ProjectItem;
}
