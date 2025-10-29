export interface ContentBlock {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface ContentSlideProps {
  id: number;
  img: string;
  items: ContentBlock[];
}
