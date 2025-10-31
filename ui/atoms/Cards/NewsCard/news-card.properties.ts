export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image?: string;
  category: string;
  href?: string;
}

export interface NewsCardProps {
  item: NewsItem;
}
