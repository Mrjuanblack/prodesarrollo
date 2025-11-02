export interface StepTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface StepTabsProps {
  tabs: StepTab[];
  defaultActive?: string;
  onChange?: (id: string) => void;
}
